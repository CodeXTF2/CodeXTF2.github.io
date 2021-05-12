# Welcome to my terminal window!                                                               
###  This system is for the use of authorized users only.  Usage of   
###  this system may be monitored and recorded by system personnel.                                                                   
###           Other than that, feel free to look around!  
### root@codex # ls
### [boxes](./boxes.md) [code](./code.md) [red_teaming](./red_teaming.md) [CTF](./ctf.md) [about](./about.md)
### root@codex # cd ./red_teaming
### root@codex # vi Mimikatz_vs_WinDef_in_2021
  
# Running Mimikatz without making Windows Defender angry (in 2021)

I've always wanted to get mimikatz to run on windows without getting flagged, but so far I have never been able to get a working Mimikatz binary past Windows 10 Defender.
However, since I recently made that fancy new FUD shellcode loader, I thought i'd give it another shot.

## Previous methods of running Mimikatz on windows
  
While I haven't been able to get a working Mimikatz.exe onto Windows 10 so far with Real Time Protection enabled, I have been able to perform mimikatz functionality using
a few methods, such as:
  
### Invoke-Mimikatz.ps1
  
[This](https://github.com/PowerShellMafia/PowerSploit/blob/master/Exfiltration/Invoke-Mimikatz.ps1) powershell version method worked for a while, especially when Invoke-Obfuscation was newly released and working very well. However, over time, it started getting caught
at runtime and eventually caught on disk. Also, powershell logging would likely catch this, since unmanaged powershell is no longer as effective (at least in its default 
configuration from github).

### Reflectively loading mimikatz
  
I haven't actually tried this myself so far, due to the next method being my previously preferred method of mimikatz usage, but I have heard from friends that you can
reflectively inject mimikatz and it will actually run, but then the powershell process will get flagged and killed shortly after. Still works though, but not so stealthy
if there's anyone watching alerts over at the blue team...

### In memory execution using an agent
  
![beacon](Mimikatz_vs_WinDef_in_2021/beacon_mimikatz.png)
  
This has so far been my most reliable method. Using an existing in memory agent such as Cobalt Strike's Beacon, or Metasploit's Meterpreter to execute mimikatz commands
has almost always worked for me so far. Sometimes it has been caught after execution (but it still did execute), similarly to reflectively loading it. On most occasions,
however, it works perfectly. This unfortunately requires an in memory agent to already be in place, so it's not as good for drive by attacks where I might just want to
plug in a USB, dump creds and run. However, this shows that undetected in memory execution of beacon is still possible.

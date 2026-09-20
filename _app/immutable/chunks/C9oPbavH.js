import{$ as e,E as t,M as n,P as r,mt as i,pt as a,tt as o}from"./C5Qr1tWr.js";import"./xihTtKlq.js";import"./DSJ1rPnI.js";import{t as s}from"./DPw4rzvf.js";import"./BrJmRK04.js";import{t as c}from"./WppY4ym1.js";import"./BIw1C4rS.js";import"./DPsrAEoc.js";var l={title:`Fun with old Siemens Cellular Phones`,date:`2011-04-27`,updated:`2025-10-04`,categories:[`gradschool`,`embedded`,`coding`],coverImage:`/images/evolution-of-communication.jpg`,coverWidth:400,coverHeight:250,excerpt:`Interfacing classic GSM phones.`},{title:u,date:d,updated:f,categories:p,coverImage:m,coverWidth:h,coverHeight:g,excerpt:_}=l,v=r(`<thead><tr><th><strong>Feature</strong></th><th><strong>Specification</strong></th></tr></thead> <tbody><tr><td><strong>Announced</strong></td><td>Q2 2003… nowadays discontinued<br/></td></tr><tr><td><strong>Display</strong></td><td>CSTN 4096 colours, 101x80px, 7 lines<br/> (yes that is old-school!!!)<br/><br/></td></tr><tr><td><strong>Sound</strong></td><td>Vibration, polyphonic ring-tones, voice notes (Intel ADPCM codec) <br/><br/></td></tr><tr><td><strong>Memory</strong></td><td>500 phone book entries @ 14 fields,<br/>Call records: 10 dialled, 10 received, 10 missed<br/>Calendar entries: 999<br/>A simple file system to manage profiles, pictures, and audio.<br/>And all of just within 1.8 MBs.<br/>(Today you can buy more than 16GB of micro SD-cards for your I-Phone/Blackberry)<br/><br/></td></tr><tr><td><strong>Battery</strong></td><td>Standard Li-Ion 700 mAh (up to 250h standby, 6h talking)<br/> Mine still lasts about 2.5 days after 7 years of use… Try to get that out of an I-Phone or Blackberry battery made in China<br/><br/></td></tr><tr><td><strong>Java</strong></td><td>MIDP-1.0, CLDC-1.0<br/>with close to none of the useful JSRs implemented.<br/><br/></td></tr><tr><td><strong>Camera</strong></td><td>This is the really fun part<br/><strong>EXTERNAL!</strong> Siemens QuickPic Camera IQP-510<br/>CMOS 640 x 480 24 bit<br/>Focus: 40 cm – infinity<br/>Automatic shutter: 1/4000 – 1/8 second<br/><br/>with LED flash<br/>(each picture is about 60kb JPEG / 6kb QVGA)<br/><br/></td></tr></tbody>`,1),y=r(`<p>I still use a Siemens M55 phone and this article describes how one can use this phone for data transfers, GRPS modem and several other things in Linux.</p> <h1 id="background"><a aria-hidden="true" tabindex="-1" href="#background"><span class="icon icon-link"></span></a>Background</h1> <p>In 2004, I was an intern at the University of Waterloo. I was doing my research term there that was actually part of my undergraduate curriculum at my home university in Germany.</p> <p>The first thing to do in Canada was to stay connected, so I got a prepaid SIM card from Fido at the time. I always loved pay as you go tariffs from Germany so I wanted to have something similar there too. Sticking it into my beloved Nokia 3310 at that time, I had to find out that this phone did not support the North American frequency band. So I had to get a new phone. What I got was a very nice Siemens M55 phone at the time for about 185$. It served me well during my internship. Unfortunately it was SIM-locked, so I left it with my cousin at that time and returned back to Germany… 3 years later in 2007, I started my PhD studies in Canada again and got it back. It was kind of cute to switch it on after it has been unused for 3 years and find out that it was still working. I really fell in love with that phone and still use it today. It is the most dependable mobile phone I had so far. I had a brief affair with a Blackberry Tour that was given to me by a friend to write some software for it, but after I gave it back, I fell back to using my M55 again.</p> <p>Even though Siemens is not making anymore mobile phones for quite a while already, spare parts are still widely available. The other thing to note is the dependability of the phone. The phone is currently about 7 years old, still has the original Lithium Ion battery that still lasts about 2.5 days. It survived several falls on stairs and walkways so far.</p> <p>These days I got back to Europe for a few weeks and decided to unlock the phone for a local carrier, because Fido roaming is just overkill over here. As it turns out buying a used and unlocked M55 on eBay Germany with all the extras turned out to be cheaper (5 EUR + shipping). So I got a second nice one.</p> <p>Since I have to travel around a lot here I actually want to use the phone to its full extend, including mobile internet connectivity via GRPS. Here is the story how to revive some untouched open source software projects and configure a more recent Linux to work all the features of this phone, including file system access, sending short messages, synchronizing calendars and synchronizing phone books. You can download all the features at the end.</p> <h1 id="the-phone-specifications"><a aria-hidden="true" tabindex="-1" href="#the-phone-specifications"><span class="icon icon-link"></span></a>The Phone Specifications</h1> <!> <p>If you see these specs below, you might think that I am anachronistic person; but as the old saying goes a craftsman is judged by the quality of his work not by his tools. This also applies somewhat to computer engineers like me. If you want to use a cellular phone for phone calls, “texting”, and as modem… you do not need an expensive bloated I-Phone, Blackberry or other prestigious smart phones. This one is just fine; plus you safe significant amounts of money on the data plan.</p> <!> <p>In 2003 this was top-notch and in terms of features and usability more than enough for a general purpose cell phone. Yes and it is still usable if you want to use it as phone and a little bit beyond.</p> <p>In the following sections I will not talk about making phone calls or how to take pictures but elaborate on some of the data integration problems when you want to use this phone in Linux.</p> <h1 id="data-connectivity"><a aria-hidden="true" tabindex="-1" href="#data-connectivity"><span class="icon icon-link"></span></a>Data Connectivity</h1> <p>This phone came with USB cable. As it turns out this cable is just a simple USB-Serial adapter. Once you connect it, it shows up as serial port in Ubuntu.</p> <pre class="language-bash"></pre> <h1 id="phone-records-management"><a aria-hidden="true" tabindex="-1" href="#phone-records-management"><span class="icon icon-link"></span></a>Phone records management</h1> <p>Since I have now two phones I need to move the data from one phone to the other. As it turns out <a href="https://sourceforge.net/projects/scmxx/" rel="nofollow">SCMxx</a> a tool that was  widely used in the past to manage Siemens phones still ships with Ubuntu. This one allows you to manage
text messages, call logs, phone books and the calendar on the command line. You can also inquire the phone specs and the
state of the memory banks.</p> <h2 id="phone-info"><a aria-hidden="true" tabindex="-1" href="#phone-info"><span class="icon icon-link"></span></a>Phone info:</h2> <pre class="language-bash"></pre> <h2 id="memory-info"><a aria-hidden="true" tabindex="-1" href="#memory-info"><span class="icon icon-link"></span></a>Memory info:</h2> <pre class="language-bash"></pre> <p><strong>To download the phonebook records into a CSV file use this one:</strong></p> <pre class="language-bash"></pre> <p><strong>The format of the phonebook is</strong></p> <pre class="language-bash"></pre> <p><strong>The phonebook can be re-imported this way</strong></p> <pre class="language-bash"></pre> <p><strong>One should note that this is a very crude way to update the phone book. I think this format is kind of the greatest common denominator when it comes to exchanging the records. With a little bit of tweaking one can actually import and export the raw phone records as vcf, as follows:</strong></p> <pre class="language-bash"></pre> <p>This approach preserves the individual fields and exports the records as individual VCF files. It will only create VCF files for records that are taken out of the 500. In my case I had just 10 records to be backed up that ended up being record_000.vcf to record_009.vcf.</p> <p>Each of those files can then be imported with (or better script this in a bash for loop). Note you explicitly need to address a particular slot to update. This makes cross-device data integration a bit complicated. For replacing the first 10 records of the “new-old phone” with those ten records of my “old-old phone”, I just used:</p> <pre class="language-bash"></pre> <p>Updating and managing the calendar records (VCS) works likewise. However, I did not have to back anything up. Writing a
script that synchronizes the records with Google calendar is on the list for future hacks. So far I was fine to have
Google Calendar send me notifications via SMS.</p> <h1 id="file-management-ring-tones-pictures-"><a aria-hidden="true" tabindex="-1" href="#file-management-ring-tones-pictures-"><span class="icon icon-link"></span></a>File Management (Ring-tones, Pictures, …)</h1> <p>While SCMxx is a nice tool to manage the records of the phone, it does not provide enough functionality to actually transfer files on and off it. A bit of searching on Google revealed that someone in the past wrote a user file system driver for Siemens phones. SIEFS theoretically allows you to mount the file system of the phone directly. That way you can upload and download files off it; and that is only from memory banks that are not locked. If you use scmxx –info (see previous section) it will show you which memory banks are locked.
The bad news, this project has not been maintained for over 6 years. The latest working configuration used fuse-2.0 and kernel-2.4.x. Being brave I downloaded it and attempted to build it. After fixing some issues manually in the code (most notably outdated autoconf/automake references, missing libraries and some legacy system calls), I finally managed to get it run. I can send you a patch for the 0.5 version for Ubuntu karmic 9.10 upon request. As shown below this code is still quite buggy and occasionally crashes.
Once you managed to build and install it, you can mount the plugged into the USB jack as follows:</p> <pre class="language-bash"></pre> <p>To unmount just use:</p> <pre class="language-bash"></pre> <p>The pictures taken from the camera have an average size of about 60KB and reside in “Data Inbox”. Ring-tones and event messages are in “Sounds”. Apparently, this phone can also record voice memos in its own format. SIEFS has a tool to convert those files into uncompressed WAV.
Looking at the existing WAV files for event notifications it turns out that this phone actually supports Intel’s ADPCM encoding (but not MP3), which can compress WAV files by a fair bit. All existing wav files were encoded as Mono, 16000Hz, 32bit float, Intel ADPCM files. I added some custom ring tones by converting them (from 32 bit, Mono, 16000Hz Microsoft uncompressed WAV) to Intel ADPCM using ffmpeg as follows.</p> <pre class="language-bash"></pre> <p>Please keep things small and short. Remember this phone only has 1.8 MB of total storage. Once you take a few pictures and have some ring-tones that space is gone.</p> <h1 id="gprs-modem"><a aria-hidden="true" tabindex="-1" href="#gprs-modem"><span class="icon icon-link"></span></a>GPRS Modem</h1> <p>As it turns out the USB-Serial connector that serves as data cable can be directly used as modem in Linux. Hacking around with Mincom, I realized that it actually accepts valid Hayes AT commands. Playing around with them you can associate the phone with GRPS and dial into IP services. Here some hacks explained.</p> <p>First set-up Mincom:</p> <pre class="language-bash"></pre> <!> <p>Go to serial port set-up and put in the appropriate port. My settings are shown below</p> <!> <p>Now “exit” and start hacking. A “#” is a comment that explains the individual AT commands.</p> <pre class="language-bash"></pre> <p>Ok now things become provider specific. When I did this I still had my SIM card from Fido sitting in the phone. Below you see the Fido configuration for the GPRS service call. In general you specify this command as</p> <pre class="language-bash"></pre> <p>The list of APNs can be obtained here for <a href="https://www.taniwha.org.uk/gprs.html" rel="nofollow">individual providers</a>. The config num
enumerates the devices APN configuration index. I usually use 1, if you have multiple providers you can use other
indexes as well. Once you dial the GPRS service you need to remember that index again. For Fido and the first
configuration index it ends up being:</p> <pre class="language-bash"></pre> <p>Now dial the appropriate index to become connected and see if the configuration works.</p> <pre class="language-bash"></pre> <p>Now that we validated that the phone supports GRPS modem and we also paid for GPRS services, we can configure wvdial with it and use it for Internet connectivity.</p> <pre class="language-bash"></pre> <p>Just issuing wvdial connects us with the Internet:</p> <pre class="language-bash"></pre> <p>Yay. Now we are connected through a very thin life-line to the Internet. The bandwidth of the <a href="https://en.wikipedia.org/wiki/GPRS" rel="nofollow">GRPS</a> data service is somewhere in between 38kbit – 114kbit, depending on the link quality and the usage of the cell.
Although you now get downloads at a rate of 6kb/second you can load Gmail in HTML mode and use Skype for messaging. For emergency situations like going on vacation without proper internet this is a still a viable solution.
Note the GRPS configuration of any other 2G phone that accepts Hayes AT commands directly is identical. Just figure out APN of your network and put it in the configuration.</p> <p>I hope some other anachronistic people out there who still use 2G phones or are in rural areas with just GRPS services (Middle-East, India, China, …) find this info helpful. On modern 3G phones you will have other options like UMTS high-bandwidth internet connectivity in Europe or the Edge network services in North America. Most of the so-called smart-phones will enable you to use their interface directly for the internet. You may also get a dedicated App for your email service, such that you do not really need to hack your phone as modem.</p> <h1 id="references"><a aria-hidden="true" tabindex="-1" href="#references"><span class="icon icon-link"></span></a>References</h1> <ul><li><a href="https://www.gsmarena.com/siemens_m55-407.php" rel="nofollow">Siemens M55 specifications</a></li> <li>The Linux GRPS HOWTO (2025 edit, link dead)</li> <li><a href="https://www.taniwha.org.uk/gprs.html" rel="nofollow">Ross Barkmans’ GRPS/UMTS info page</a></li> <li><a href="https://sourceforge.net/projects/scmxx/" rel="nofollow">SCMxx</a></li> <li><a href="https://www.modemhelp.net/basicatcommand.shtml" rel="nofollow">Basic Hayes AT commands</a></li></ul> <hr/> <p><a href="https://survivalengineer.blogspot.com/2011/04/fun-with-old-siemens-cellular-phones.html" rel="nofollow">Cross Posted on my old Blog</a></p>`,1);function b(r){var l=y(),u=o(e(l),16);s(u,{src:`/images/M55.JPG`,width:`500`,alt:`Siemens M55`});var d=o(u,4);c(d,{title:`Siemens M55 Specifications`,children:(e,t)=>{var r=v();a(2),n(e,r)},$$slots:{default:!0}});var f=o(d,10);t(f,()=>`<code class="language-bash">treideme@PROBLEM:~$ <span class="token function">dmesg</span>
<span class="token punctuation">..</span>.
<span class="token punctuation">[</span><span class="token number">15212.672612</span><span class="token punctuation">]</span> usb <span class="token number">5</span>-2: new full speed USB device using uhci_hcd and address <span class="token number">14</span>
<span class="token punctuation">[</span><span class="token number">15212.835492</span><span class="token punctuation">]</span> usb <span class="token number">5</span>-2: configuration <span class="token comment">#1 chosen from 1 choice</span>
<span class="token punctuation">[</span><span class="token number">15212.837416</span><span class="token punctuation">]</span> pl2303 <span class="token number">5</span>-2:1.0: pl2303 converter detected
<span class="token punctuation">[</span><span class="token number">15212.853324</span><span class="token punctuation">]</span> usb <span class="token number">5</span>-2: pl2303 converter now attached to ttyUSB0
<span class="token punctuation">..</span>.
treideme@PROBLEM:~$ lsusb
<span class="token punctuation">..</span>.
Bus 005 Device 014: ID 067b:2303 Prolific Technology, Inc. PL2303 Serial Port
<span class="token punctuation">..</span>.</code>`,!0),i(f);var p=o(f,8);t(p,()=>`<code class="language-bash">treideme@PROBLEM:~$ scmxx <span class="token parameter variable">-d</span> /dev/ttyUSB0 <span class="token parameter variable">--info</span>
Accessing device /dev/ttyUSB0<span class="token punctuation">..</span>.done
OK, a modem device is present.
Phone related information:
Vendor:       SIEMENS
Model:        M55
Revision:     <span class="token number">11</span>
IMEI:         xxx
Battery:      <span class="token number">70</span>%
Charsets:     GSM, UCS2
Time:         Wed <span class="token number">27</span> Apr <span class="token number">2011</span> <span class="token number">12</span>:41:44 PM EDT

SIM card related information:
IMSI:         xxx
card ID:      xxx

Network related information:
Status:       registered, roaming
Area code:    017C
Cell ID:      0CC9
Operator:     Vodafone D2
SMS server:   +15149931123
Signal:       <span class="token parameter variable">-51</span> dBm
GPRS class:   B
GRPS status:  not registered, not searching, detached

Available memories:
Binary files:  bmp, mid, vcf, vcs, t9d
Phonebooks:    FD, SM, ON, LD, MC, RC, OW, SD, MS, CD, BL, MB, RD, CS, VCF
SMS storages:  MT, SM, ME

Settings:
Locks: CS, PS, PF, SC, AO, OI, OX, AI, IR, AB, AG, AC, FD, PN, PU, PP, PC</code>`,!0),i(p);var m=o(p,4);t(m,()=>`<code class="language-bash">treideme@PROBLEM:~$ scmxx <span class="token parameter variable">-d</span> /dev/ttyUSB0 --mem-info
Accessing device /dev/ttyUSB0<span class="token punctuation">..</span>.done
Detected SIEMENS M55
Binary files:
mem  readable  writable  description
---  --------  --------  ----------- 
bmp     <span class="token number">0</span>-2       <span class="token number">0</span>-4    bitmap
mid    <span class="token number">0</span>-10      <span class="token number">0</span>-10    midi
vcf    <span class="token number">0</span>-500     <span class="token number">0</span>-500   vCard <span class="token punctuation">(</span>address book<span class="token punctuation">)</span>
vcs    <span class="token number">1</span>-500     <span class="token number">0</span>-500   vCalendar
t9d    none        <span class="token number">0</span>     T9 database

Phonebooks:   
mem  slots   writable  digits  chars  description
---  ------  --------  ------  -----  ----------- 
FD    <span class="token number">1</span>-20      <span class="token function">yes</span>      <span class="token number">20</span>      <span class="token number">18</span>   SIM fix-dialing phonebook
SM    <span class="token number">1</span>-255     <span class="token function">yes</span>      <span class="token number">20</span>      <span class="token number">18</span>   SIM phonebook
ON     <span class="token number">1</span>-4      <span class="token function">yes</span>      <span class="token number">20</span>      <span class="token number">18</span>   own numbers
LD    <span class="token number">1</span>-10      no       <span class="token number">20</span>      <span class="token number">18</span>   last calls <span class="token punctuation">(</span>SIM<span class="token punctuation">)</span>
MC    <span class="token number">1</span>-10      no       <span class="token number">20</span>      <span class="token number">18</span>   missed calls
RC    <span class="token number">1</span>-10      no       <span class="token number">20</span>      <span class="token number">18</span>   callback numbers
OW     <span class="token number">1</span>-4      no       <span class="token number">20</span>      <span class="token number">18</span>   own numbers
SD     <span class="token number">1</span>-5      no       <span class="token number">20</span>      <span class="token number">18</span>   <span class="token function">service</span> numbers
MS    <span class="token number">1</span>-10      no       <span class="token number">20</span>      <span class="token number">18</span>   missed calls
CD    <span class="token number">1</span>-10      no       <span class="token number">20</span>      <span class="token number">18</span>   callback numbers
BL     <span class="token number">1</span>-8      no       <span class="token number">20</span>      <span class="token number">0</span>    blacklist numbers
MB     <span class="token number">1</span>-2      no       <span class="token number">20</span>      <span class="token number">10</span>   mailbox numbers
RD    none      no       <span class="token number">20</span>      <span class="token number">31</span>   red book <span class="token punctuation">(</span>VIP <span class="token keyword">in</span> CS<span class="token punctuation">)</span>
CS     <span class="token number">1</span>-2      no       <span class="token number">20</span>      <span class="token number">31</span>   common sortable <span class="token punctuation">(</span>FD+SM+ME<span class="token punctuation">)</span>
VCF    <span class="token number">1</span>-2      no                    address book numbers

SMS storages:
mem   slots     used    description
---  ------  ---------  ----------- 
MT    <span class="token number">1</span>-150    <span class="token number">14</span>/150   ME + SM
SM    <span class="token number">1</span>-50      <span class="token number">0</span>/50    SIM memory
ME    <span class="token number">1</span>-100    <span class="token number">14</span>/100   mobile equipment memory</code>`,!0),i(m);var h=o(m,4);t(h,()=>`<code class="language-bash">treideme@PROBLEM:~$ scmxx <span class="token parameter variable">-d</span> /dev/ttyUSB0 <span class="token parameter variable">--get</span> <span class="token parameter variable">-P</span> <span class="token parameter variable">--out</span><span class="token operator">=</span>pbook.pb
Using <span class="token string">"UTF-8"</span> as system character set.
Accessing device /dev/ttyUSB0<span class="token punctuation">..</span>.done
OK, a modem device is present.
Detected SIEMENS M55
Receiving phonebook entries<span class="token punctuation">..</span>.
SM<span class="token punctuation">(</span><span class="token number">1</span>-255<span class="token punctuation">)</span> <span class="token punctuation">[</span><span class="token operator">==</span><span class="token operator">=</span><span class="token punctuation">]</span> <span class="token number">100</span>%</code>`,!0),i(h);var g=o(h,4);t(g,()=>`<code class="language-bash"><span class="token punctuation">&#123;</span>ID<span class="token punctuation">&#125;</span>,”<span class="token punctuation">&#123;</span>PHONE NUMBER<span class="token punctuation">&#125;</span>”,”<span class="token punctuation">&#123;</span>NAME<span class="token punctuation">&#125;</span>”</code>`,!0),i(g);var _=o(g,4);t(_,()=>`<code class="language-bash">treideme@PROBLEM:~$ scmxx <span class="token parameter variable">-d</span> /dev/ttyUSB0 <span class="token parameter variable">--send</span> <span class="token parameter variable">-P</span> pbook.pb
Accessing device /dev/ttyUSB0<span class="token punctuation">..</span>.done
Detected SIEMENS M55
Updating entries SM<span class="token punctuation">(</span><span class="token number">1</span>-255<span class="token punctuation">)</span> <span class="token punctuation">[</span><span class="token operator">==</span><span class="token operator">=</span><span class="token punctuation">]</span> <span class="token number">100</span>%
<span class="token keyword">done</span></code>`,!0),i(_);var b=o(_,4);t(b,()=>`<code class="language-bash">treideme@PROBLEM:~$ scmxx <span class="token parameter variable">-d</span> /dev/ttyUSB0 <span class="token parameter variable">--get</span> <span class="token parameter variable">--binary</span> <span class="token parameter variable">--mem</span><span class="token operator">=</span><span class="token string">"vcf"</span> <span class="token parameter variable">--out</span><span class="token operator">=</span>record_
Using <span class="token string">"UTF-8"</span> as system character set.
Accessing device /dev/ttyUSB0<span class="token punctuation">..</span>.done
OK, a modem device is present.
Detected SIEMENS M55
vcf slot <span class="token number">0</span> <span class="token punctuation">[</span><span class="token operator">==</span><span class="token operator">=</span><span class="token punctuation">]</span> <span class="token number">100</span>%
<span class="token punctuation">..</span>.
vcf slot <span class="token number">500</span> <span class="token punctuation">[</span><span class="token operator">==</span><span class="token operator">=</span><span class="token punctuation">]</span> <span class="token number">100</span>%</code>`,!0),i(b);var x=o(b,6);t(x,()=>`<code class="language-bash">treideme@PROBLEM:~$ <span class="token keyword">for</span> <span class="token for-or-select variable">i</span> <span class="token keyword">in</span> <span class="token variable"><span class="token variable">&#96;</span><span class="token function">seq</span> <span class="token number">0</span> <span class="token number">9</span><span class="token variable">&#96;</span></span>
<span class="token operator">></span> <span class="token keyword">do</span>
<span class="token operator">></span> scmxx <span class="token parameter variable">-d</span> /dev/ttyUSB0 <span class="token parameter variable">--send</span> <span class="token parameter variable">--binary</span> <span class="token parameter variable">--mem</span><span class="token operator">=</span><span class="token string">"vcf"</span> <span class="token parameter variable">--slot</span> <span class="token variable">$&#123;i&#125;</span> record_00<span class="token variable">$&#123;i&#125;</span>.vcf
<span class="token operator">></span> <span class="token keyword">done</span>
Accessing device /dev/ttyUSB0<span class="token punctuation">..</span>.done
OK, a modem device is present.
Detected SIEMENS M55
Using slot <span class="token number">0</span>
File transfer<span class="token punctuation">..</span>.
Waiting <span class="token keyword">for</span> data request<span class="token punctuation">..</span>.Sending data<span class="token punctuation">..</span>.Packet <span class="token number">1</span> sent
File transfer complete.
<span class="token punctuation">..</span>.</code>`,!0),i(x);var S=o(x,8);t(S,()=>`<code class="language-bash">treideme@PROBLEM:~$ <span class="token function">sudo</span> <span class="token function">mount</span> <span class="token parameter variable">-t</span> siefs /dev/ttyUSB0 /mnt1/
<span class="token punctuation">[</span>sudo<span class="token punctuation">]</span> password <span class="token keyword">for</span> treideme:
treideme@PROBLEM:~$ <span class="token function">sudo</span> <span class="token function">ls</span> /mnt1
ls: reading directory /mnt1: Input/output error
<span class="token comment"># Yes above one of those random crashes I’m talking about</span>
<span class="token comment"># Unplug the usbcable, remount and then try again and it works…</span>
treideme@PROBLEM:~$ <span class="token function">sudo</span> <span class="token function">ls</span> <span class="token parameter variable">-l</span> /mnt1
total <span class="token number">0</span>
drwxrwxrwx <span class="token number">1</span> root root <span class="token number">0</span> <span class="token number">2003</span>-01-01 00:00 Address book
drwxrwxrwx <span class="token number">1</span> root root <span class="token number">0</span> <span class="token number">2003</span>-01-01 00:08 apo
drwxrwxrwx <span class="token number">1</span> root root <span class="token number">0</span> <span class="token number">2003</span>-01-01 00:08 Cache
drwxrwxrwx <span class="token number">1</span> root root <span class="token number">0</span> <span class="token number">2003</span>-01-01 00:00 Colour scheme
drwxrwxrwx <span class="token number">1</span> root root <span class="token number">0</span> <span class="token number">2003</span>-01-01 00:00 Customization
drwxrwxrwx <span class="token number">1</span> root root <span class="token number">0</span> <span class="token number">2003</span>-01-01 00:08 Data inbox
drwxrwxrwx <span class="token number">1</span> root root <span class="token number">0</span> <span class="token number">2003</span>-01-01 00:10 email
drwxrwxrwx <span class="token number">1</span> root root <span class="token number">0</span> <span class="token number">2003</span>-01-01 00:08 Internet
drwxrwxrwx <span class="token number">1</span> root root <span class="token number">0</span> <span class="token number">2003</span>-01-01 00:00 Java
drwxrwxrwx <span class="token number">1</span> root root <span class="token number">0</span> <span class="token number">2003</span>-01-01 00:00 PersistentData
drwxrwxrwx <span class="token number">1</span> root root <span class="token number">0</span> <span class="token number">2003</span>-01-01 00:00 Pictures
drwxrwxrwx <span class="token number">1</span> root root <span class="token number">0</span> <span class="token number">2003</span>-01-01 00:00 Sounds</code>`,!0),i(S);var C=o(S,4);t(C,()=>`<code class="language-bash">treideme@PROBLEM:~$ <span class="token function">sudo</span> <span class="token function">umount</span> /mnt1</code>`,!0),i(C);var w=o(C,4);t(w,()=>`<code class="language-bash">treideme@PROBLEM:~$ ffmpeg <span class="token parameter variable">-i</span> licht.wav <span class="token parameter variable">-acodec</span> adpcm_ima_wav licht2.wav</code>`,!0),i(w);var T=o(w,10);t(T,()=>`<code class="language-bash">treideme@PROBLEM:~$ minicom <span class="token parameter variable">-s</span></code>`,!0),i(T);var E=o(T,2);s(E,{src:`/images/Minicom.png`,width:`300`,alt:`Minicom setup`});var D=o(E,4);s(D,{src:`/images/Minicom1.png`,width:`500`,alt:`Minicom setup`});var O=o(D,4);t(O,()=>`<code class="language-bash">Welcome to minicom <span class="token number">2.3</span>                                                        
                                                                              
OPTIONS: I18n                                                                 
Compiled on Sep <span class="token number">25</span> <span class="token number">2009</span>, <span class="token number">23</span>:45:34.                                            
Port /dev/ttyUSB0                                                             
                                                                              
                 Press CTRL-A Z <span class="token keyword">for</span> <span class="token builtin class-name">help</span> on special keys                                    
                                                                                            
AT <span class="token assign-left variable">S7</span><span class="token operator">=</span><span class="token number">45</span> <span class="token assign-left variable">S0</span><span class="token operator">=</span><span class="token number">0</span> L1 V1 X4 <span class="token operator">&amp;</span>c1 E1 Q0                                                             
OK                                                                                          
<span class="token comment"># Above was the default minicom modem init sequence</span>
<span class="token comment"># below here you start to enter stuff</span>
<span class="token comment"># let’s see if it actually accepts AT commands</span>
AT                                                                                           
OK
<span class="token comment"># Look if we are already associated with GRPS?</span>
AT+CGATT?                                                                     
+CGATT: <span class="token number">0</span>                                                                      
                                                                              
OK    
<span class="token comment"># +CGATT: 0 = Nope we are not...</span>
<span class="token comment"># So lets do it</span>
AT+CGATT<span class="token operator">=</span><span class="token number">1</span>                                                                    
OK
<span class="token comment"># Wait a couple seconds and check again</span>
AT+CGATT?                                                                     
+CGATT: <span class="token number">1</span>                                                                     
                                                                               
OK
<span class="token comment"># Yay!!!</span></code>`,!0),i(O);var k=o(O,4);t(k,()=>`<code class="language-bash">AT+CGDCONT<span class="token operator">=</span>,<span class="token string">"IP"</span>,<span class="token string">"&#123;APN&#125;"</span></code>`,!0),i(k);var A=o(k,4);t(A,()=>`<code class="language-bash">AT+CGDCONT<span class="token operator">=</span><span class="token number">1</span>,<span class="token string">"IP"</span>,<span class="token string">"internet.fido.ca"</span>
OK</code>`,!0),i(A);var j=o(A,4);t(j,()=>`<code class="language-bash"><span class="token comment"># ATD *99***#</span>
<span class="token comment"># so for configuration index 1… wait a couple seconds</span>
ATD*99***1<span class="token comment">#</span>
CONNECT</code>`,!0),i(j);var M=o(j,4);t(M,()=>`<code class="language-bash"><span class="token comment"># /etc/wvdial.conf:</span>
<span class="token punctuation">[</span>Dialer Defaults<span class="token punctuation">]</span>
Modem <span class="token operator">=</span> /dev/ttyUSB0
Baud <span class="token operator">=</span> <span class="token number">115200</span>
Init1 <span class="token operator">=</span> AT+CGDCONT<span class="token operator">=</span><span class="token number">1</span>,<span class="token string">"IP"</span>,<span class="token string">"internet.fido.ca"</span>
Init2 <span class="token operator">=</span>
Init3 <span class="token operator">=</span>
Area Code <span class="token operator">=</span>
Phone <span class="token operator">=</span> *99***1<span class="token comment">#</span>
Username <span class="token operator">=</span> internet
Password <span class="token operator">=</span> internet
Ask Password <span class="token operator">=</span> <span class="token number">0</span>
Dial Command <span class="token operator">=</span> ATD
Stupid Mode <span class="token operator">=</span> <span class="token number">1</span>
Compuserve <span class="token operator">=</span> <span class="token number">0</span>
Force Address <span class="token operator">=</span>
Idle Seconds <span class="token operator">=</span> <span class="token number">0</span>
DialMessage1 <span class="token operator">=</span>
DialMessage2 <span class="token operator">=</span>
ISDN <span class="token operator">=</span> <span class="token number">0</span>
Auto DNS <span class="token operator">=</span> <span class="token number">1</span>
Check Def Route <span class="token operator">=</span> <span class="token number">1</span></code>`,!0),i(M);var N=o(M,4);t(N,()=>`<code class="language-bash">treideme@PROBLEM:~$ <span class="token function">sudo</span> wvdial
--<span class="token operator">></span> WvDial: Internet dialer version <span class="token number">1.60</span>
--<span class="token operator">></span> Cannot get information <span class="token keyword">for</span> serial port.
--<span class="token operator">></span> Initializing modem.
--<span class="token operator">></span> Sending: AT+CGDCONT<span class="token operator">=</span><span class="token number">1</span>,<span class="token string">"IP"</span>,<span class="token string">"internet.fido.ca"</span>
AT+CGDCONT<span class="token operator">=</span><span class="token number">1</span>,<span class="token string">"IP"</span>,<span class="token string">"internet.fido.ca"</span>
OK
--<span class="token operator">></span> Modem initialized.
--<span class="token operator">></span> Sending: ATD*99***1<span class="token comment">#</span>
--<span class="token operator">></span> Waiting <span class="token keyword">for</span> carrier.
ATD*99***1<span class="token comment">#</span>
CONNECT
--<span class="token operator">></span> Carrier detected.  Starting PPP immediately.
--<span class="token operator">></span> Starting pppd at Wed Apr <span class="token number">27</span> 08:27:59 <span class="token number">2011</span>
--<span class="token operator">></span> Pid of pppd: <span class="token number">25044</span>
--<span class="token operator">></span> Using interface ppp0
--<span class="token operator">></span> <span class="token builtin class-name">local</span>  IP address <span class="token number">25.30</span>.202.165
--<span class="token operator">></span> remote IP address <span class="token number">192.168</span>.254.254
--<span class="token operator">></span> primary   DNS address <span class="token number">64.71</span>.255.198
--<span class="token operator">></span> secondary DNS address <span class="token number">64.71</span>.255.253</code>`,!0),i(N),a(12),n(r,l)}export{b as default,l as metadata};
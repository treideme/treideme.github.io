import{$ as e,F as t,M as n,P as r,pt as i,tt as a}from"./C5Qr1tWr.js";import"./xihTtKlq.js";import"./DSJ1rPnI.js";import{t as o}from"./DPw4rzvf.js";import{t as s}from"./BrJmRK04.js";import"./WppY4ym1.js";import"./BIw1C4rS.js";import{t as c}from"./DPsrAEoc.js";var l={title:`A Tiny Companion`,date:`2022-11-20`,updated:`2025-10-04`,categories:[`covid-19`,`coding`],coverImage:`/images/tiny_size.jpg`,coverWidth:1024,coverHeight:792,excerpt:`Ulta low power RTC design.`},{title:u,date:d,updated:f,categories:p,coverImage:m,coverWidth:h,coverHeight:g,excerpt:_}=l,v=r(`<p>I finally received the laptop that I ordered a while back on Aliexpress. Given that I have a bunch of Christmas travel
lined up and may spend hours being crammed in excessively priced airplane economy seats, I was seriously thinking of
ways to reduce my electronic baggage. Typically I would have a phone, a big Thinkpad, a headset, and a slew of power
adapters with me. Especially being shoulder-to-shoulder with random strangers you cannot have a long laptop sitting on
an airplane, you need something small. I never liked tablets and have a real aversion to on-screen keyboards and
decidedly limited features for hacking in Android or iOS. If it can not run a desktop operating system, it will not be
worth it. I have to admit the Microsoft Surface was a close miss, but its size and price still put me off.</p> <p>Twenty years ago, my Boss had a solution for this. He bought a used <a href="https://www.nicovideo.jp/watch/sm134909" rel="nofollow">Toshiba Libretto</a> and took this thing everywhere. He
primarily used it to review papers. I was always amazed at how the Japanese managed to cram that much stuff into such a
small package. For its time it was underpowered, too loud, had a terrible Trackpoint interface, and had too small
keyboard buttons, but that was an acceptable compromise for being able to carry it anywhere.</p> <p>So it looks like I found the modern-day equivalent for just <a href="https://www.aliexpress.com/item/1005004282713649.html" rel="nofollow">$300 USD on Aliexpress</a>. It does not have a model name, but
neatly comes in an A5 format and packs a 4-core Celeron J4125, 12GB RAM, and can be upgraded with an M2 SSD to terabytes
of persistent storage. The OEM did manage to install an unactivated version of Windows 11 Pro. In terms of raw compute
performance, the Celeron <a href="https://www.cpubenchmark.net/compare/3667vs809/Intel-Celeron-J4125-vs-Intel-i5-2520M" rel="nofollow">barely outruns an Intel i5 mobile</a> from almost a decade ago but comes with integrated graphics
and hardware acceleration for pretty much any modern media codec to make up for it. As a whole package, this is good
enough for daily use, but not a gaming laptop, or something I would hand AI developers.</p> <p>Due to the lack of documentation and probably very creative ways to put this together in a cost-effective manner, the
biggest challenge was to install some form of Linux on there to have a development environment for all my embedded
needs, should something come up during travel.</p> <p>As it turns out the local audio interface uses a non-standard audio amplifier after the Intel Sound card that seems
to work on the pre-installed Windows 11, but there was no way I could get it to work in two flavours of Ubuntu. This
is not a showstopper as you will be likely on a headset most of the time anyway and the Realtek Wi-Fi and Bluetooth
drivers worked out of the box.</p> <!> <p>The bigger challenge was that the VESA driver from the BIOS rotates the display by 90 degrees and hardwires hsync to a
fixed 77Hz refresh rate. So the screen is rotated sideways during installation, and any mode set attempt will kill the
screen. Installing Ubuntu 20.04 in compatibility mode got the i915 kernel driver to work. That driver can be instructed
to avoid <a href="https://wiki.archlinux.org/title/Kernel_mode_setting" rel="nofollow">mode switches</a> and for anything console-related, you can
use <a href="https://www.kernel.org/doc/Documentation/fb/fbcon.txt" rel="nofollow">fbcon</a> to rotate the screen in VESA text mode and
choose an appropriately sized font. The only thing that I could not rotate was the Grub OS selection. This probably
hints that they likely hacked a tablet screen and make it appear as a laptop.</p> <p>The next challenge was the mouse pointer. The AccuPoint accurately moves around the pointer, but the mouse buttons are
actually recognized as keyboard strokes. It took some digging, but I was eventually able to <a href="https://www.reddit.com/r/linux/comments/105ocez/if_you_want_to_remap_your_keyboard_keys_or_mouse/" rel="nofollow">remap</a> them. On the Windows
end the buttons of the mouse can only be enabled if the “MouseKeys” setting is enabled that normally would only map the
numeric keypad as a mouse.</p> <p>The power consumption is impressively low. While I was recompiling an entire <a href="https://www.yoctoproject.org/" rel="nofollow">Yocto Linux distribution</a> from scratch I
never saw more than 18W power consumed, and normal loads of less than 10W. It took a few hours and was running at full
tilt, but I did not see any stability issues.</p> <!> <p>I moved most of my office stuff into the Windows partition to mitigate some of these issues. Overall, this thing
exceeded my expectations. It also comes in a sturdy Aluminum enclosure and has a five-point touch screen that worked
accurately out of the box on both operating systems. The next tiny project is to modify the PSU in a way that it can
be charged from a USB-C battery bank instead of just using the 12V AC adapter. This would make it even more travel-friendly.
This brings back the ubiquitous IBM Thinkpad feel of the 90s and early 2000s, where you could take your laptop anywhere and
it would just work. I am looking forward to taking this on the road.</p> <!><br/> <!>`,1);function y(r){var l=v(),u=a(e(l),10);o(u,{src:`/images/tiny_fbrot.jpg`,alt:`VESA Framebuffer Rotated by 90 Degrees`,width:`500`});var d=a(u,8);o(d,{src:`/images/tiny_power.jpg`,alt:`Recompiling Yocto Linux`,width:`500`});var f=a(d,4);c(f,{id:`hUCEIWhQ1q8`,width:`500`});var p=a(f,3);s(p,{children:(e,r)=>{i();var a=t(`2025 Update: So it turns out the USB-C power adapters that pass through 12V though a Barrel adapter work with this
for Charging. 12V is not enough to run the laptop, but it will work with the internal Charging circuit. I have an
10000 MAh powerbank that I boost to 12 volt that discharges to about 20% before the laptop is fully charged.`);n(e,a)},$$slots:{default:!0}}),n(r,l)}export{y as default,l as metadata};
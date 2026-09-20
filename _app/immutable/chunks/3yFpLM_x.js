import{$ as e,E as t,M as n,P as r,mt as i,pt as a,tt as o}from"./C5Qr1tWr.js";import"./xihTtKlq.js";import"./DSJ1rPnI.js";import{t as s}from"./DPw4rzvf.js";import"./BrJmRK04.js";import"./WppY4ym1.js";import"./BIw1C4rS.js";import"./DPsrAEoc.js";var c={title:`Label Printers and libUSB`,date:`2022-09-21`,updated:`2025-10-04`,categories:[`covid-19`,`coding`,`embedded`],coverImage:`/images/pt-p710bt.jpg`,coverWidth:768,coverHeight:1140,excerpt:`A Practical Introduction to libUSB and Raster Printers.`},{title:l,date:u,updated:d,categories:f,coverImage:p,coverWidth:m,coverHeight:h,excerpt:g}=c,_=r(`<p>This article provides a basic introduction to libUSB by using a Brother tape printer. All sources and the finished
library <a href="https://github.com/treideme/brother_pt" rel="nofollow">are on GitHub</a>.</p> <p>I remember that as a kid, my first serious workstation was an <a href="https://en.wikipedia.org/wiki/Escom_AG" rel="nofollow">Eskom 80386-DX40</a> computer as part of the package
my parents also got a <a href="https://www.fujitsu.com/downloads/COMP/fel/support/printer/manuals/dl1100_bro.pdf" rel="nofollow">Fujitsu DL</a> dot-matrix printer with endless paper feed. Since the internet and online
sharing of your creations were still in the distant future, a lot of school work and art you made was still shared with
friends via hardcopy (a good euphemism for actual prints). Eventually, being a coding nerd, I coded up a few programs
to directly interface this printer for organizing my school work and personal floppy collections in Turbo Pascal.
Pretty much all printers back in the day had a standard character mode and were supported by the <a href="http://bitsavers.org/pdf/borland/turbo_pascal/Turbo_Pascal_Version_5.0_Reference_Guide_1989.pdf" rel="nofollow">printer unit</a>.
The familiar noise of the dot head hammering out data could be heard in the 90s doctor’s offices,
airline reservation centers, and pretty much every small business that had to issue invoices.</p> <p>These days paper reliance has taken the backseat for a lot of personal and business work, except when it comes to
required product labeling and various forms of government contracts with formerly Her Majesty now His Majesty in
various Commonwealth nations like Canada. Most consumer printers will not be supported without drivers by low-level
programming languages. The familiar Centronics interface has long been replaced by USB, Wifi, Bluetooth, or Ethernet
interfaces. The closest thing you come to an exclusively-controlled printer that is hardwired to a workstation is a
USB interface.</p> <p>I hit an interesting problem at work, where as part of the end-of-line assembly and test of a product we had to add a
product label that would change with every device. Most commercial printers that would come with an SDK and the related
tooling will put you in the thousands. A lower-cost alternative was to look into laminated tape printers that we have
long used for labeling cable assemblies and other low-volume interfaces. For Brothers TZe tape you can get all sorts
of tapes up to 36mm wide, and this tape is <a href="https://www.farnell.com/datasheets/2337777.pdf" rel="nofollow">surprisingly rugged</a>:</p> <ul><li>Brother provides drivers for various platforms as well as an <a href="http://www.brother.com/product/dev/index.htm" rel="nofollow">SDK for Windows (only)</a>. However, one of the
main drawbacks of Brothers’ software stack is that it obfuscates direct raster print. I have not found a method
yet to avoid dithering artifacts from scaling images or other features down to raster print them. For text and
parametric features, the software works well, but if you really want to exploit the surprisingly high resolution
of these printers, you have to hit the bare metal and go direct, since this was meant to go into a production
setting, using USB looked more promising than any wireless interface like Bluetooth.</li></ul> <h1 id="enter-usb"><a aria-hidden="true" tabindex="-1" href="#enter-usb"><span class="icon icon-link"></span></a>Enter USB</h1> <p>USB has been around since the mid-90s. It was a revolutionary attempt to find one universal interface for many computer
peripherals. On advantage USB has over legacy interfaces is that it supports tree topologies. One USB host can support
up to 127 devices. The USB standard evolved over the years to increase speed and features, new device classes
have been added. In a nutshell each device advertises a vendor and device identifier, the USB host enumerate the device
as it is plugged in (hot). Each device can have up to 30 endpoints (i.e. IDs from 1 to 15 and separate read and write
endpoints) to communicate with the host. Endpoint 0 IN and OUT is used as control channel. Think of an endpoint as a
buffer that can be either read or written to by the USB host. To communicate to the endpoint the host opens a pipe.
Depending on the USB standard the pipe supports various types of transfers.</p> <!> <p>On a higher level, the USB device can identify itself as a device class via endpoint 0. For this post, we will leave it
at the endpoint level for now. A quick peek at the <a href="https://download.brother.com/welcome/docp100064/cv_pte550wp750wp710bt_eng_raster_102.pdf" rel="nofollow">command reference</a> reveals that our chosen printer has two
data endpoints, one for writing (EP2) and one for reading (EP1).</p> <!> <p>A fairly straightforward way to communicate with USB devices is <a href="https://libusb.info/" rel="nofollow">libUSB</a>. To keep it fast and simple, we will
demo the interface using its Python wrapper <a href="https://github.com/pyusb/pyusb" rel="nofollow">PyUSB</a>. To get started let us set up a virtual environment.</p> <pre class="language-bash"></pre> <p>Now plug in the printer and power it on. Note, for some reason this printer powers down after a few minutes of idle. If
this does not work, make sure the printer is active.</p> <pre class="language-python"></pre> <p>Yay, we see the printer and can get to the endpoints from the manual. From the above trace we note that the
device output endpoint for sending data to the printer has address 0x2 and our input endpoint for receiving status
information has address 0x81. Let’s see if we can get to the status of the printer, please see the command
reference for decoding.</p> <pre class="language-python"></pre> <p>Yes this was a simple demonstration of how to get to a USB printer. Armed with this success, I turned this into a raster
print package for that printer series that can print directly from PNG files to tape. You can find all the sources <a href="https://github.com/treideme/brother_pt" rel="nofollow">here on GitHub</a>.</p> <p>Maybe in the future, we can continue this as a retro project on an MCS-51 derivative and print directly to USB from a
microcontroller such as the WCH <a href="http://www.wch-ic.com/products/CH559.html" rel="nofollow">CH559</a>.</p>`,1);function v(r){var c=_(),l=o(e(c),14);s(l,{src:`/images/sample_usb_topology_axelson.png`,alt:`USB Topology, Axelson`,width:`500`});var u=o(l,4);s(u,{src:`/images/brother_cube_usb_endpoints.png`,alt:`USB Endpoints of the Printer`,width:`500`});var d=o(u,4);t(d,()=>`<code class="language-bash"><span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> libusb-1.0-0-dev python3 python3-venv
<span class="token function">mkdir</span> usbtest
<span class="token builtin class-name">cd</span> usbtest
python3 <span class="token parameter variable">-m</span> venv venv
<span class="token builtin class-name">source</span> venv/bin/activate
pip <span class="token function">install</span> pyusb
<span class="token comment"># start python interactively</span>
python3
<span class="token comment"># ...</span></code>`,!0),i(d);var f=o(d,4);t(f,()=>`<code class="language-python"><span class="token operator">>></span><span class="token operator">></span> <span class="token keyword">import</span> usb<span class="token punctuation">.</span>core
<span class="token operator">>></span><span class="token operator">></span> <span class="token keyword">import</span> usb<span class="token punctuation">.</span>util
<span class="token operator">>></span><span class="token operator">></span> dev <span class="token operator">=</span> usb<span class="token punctuation">.</span>core<span class="token punctuation">.</span>find<span class="token punctuation">(</span>idVendor<span class="token operator">=</span><span class="token number">0x04F9</span><span class="token punctuation">,</span> idProduct<span class="token operator">=</span><span class="token number">0x20AF</span><span class="token punctuation">)</span>
<span class="token operator">>></span><span class="token operator">></span> <span class="token keyword">print</span><span class="token punctuation">(</span>dev<span class="token punctuation">)</span>
<span class="token boolean">None</span>
<span class="token operator">>></span><span class="token operator">></span> dev <span class="token operator">=</span> usb<span class="token punctuation">.</span>core<span class="token punctuation">.</span>find<span class="token punctuation">(</span>idVendor<span class="token operator">=</span><span class="token number">0x04F9</span><span class="token punctuation">,</span> idProduct<span class="token operator">=</span><span class="token number">0x20AF</span><span class="token punctuation">)</span>
<span class="token operator">>></span><span class="token operator">></span> <span class="token keyword">print</span><span class="token punctuation">(</span>dev<span class="token punctuation">)</span>
DEVICE ID 04f9<span class="token punctuation">:</span>20af on Bus <span class="token number">001</span> Address <span class="token number">014</span> <span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">=</span>
 bLength                <span class="token punctuation">:</span>   <span class="token number">0x12</span> <span class="token punctuation">(</span><span class="token number">18</span> <span class="token builtin">bytes</span><span class="token punctuation">)</span>
 bDescriptorType        <span class="token punctuation">:</span>    <span class="token number">0x1</span> Device
 bcdUSB                 <span class="token punctuation">:</span>  <span class="token number">0x200</span> USB <span class="token number">2.0</span>
 bDeviceClass           <span class="token punctuation">:</span>    <span class="token number">0x0</span> Specified at interface
 bDeviceSubClass        <span class="token punctuation">:</span>    <span class="token number">0x0</span>
 bDeviceProtocol        <span class="token punctuation">:</span>    <span class="token number">0x0</span>
 bMaxPacketSize0        <span class="token punctuation">:</span>   <span class="token number">0x40</span> <span class="token punctuation">(</span><span class="token number">64</span> <span class="token builtin">bytes</span><span class="token punctuation">)</span>
 idVendor               <span class="token punctuation">:</span> <span class="token number">0x04f9</span>
 idProduct              <span class="token punctuation">:</span> <span class="token number">0x20af</span>
 bcdDevice              <span class="token punctuation">:</span>  <span class="token number">0x100</span> Device <span class="token number">1.0</span>
 iManufacturer          <span class="token punctuation">:</span>    <span class="token number">0x1</span> Brother
 iProduct               <span class="token punctuation">:</span>    <span class="token number">0x2</span> PT<span class="token operator">-</span>P710BT
 iSerialNumber          <span class="token punctuation">:</span>    <span class="token number">0x3</span> 000C2Z431003
 bNumConfigurations     <span class="token punctuation">:</span>    <span class="token number">0x1</span>
  CONFIGURATION <span class="token number">1</span><span class="token punctuation">:</span> <span class="token number">500</span> mA <span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span>
   bLength              <span class="token punctuation">:</span>    <span class="token number">0x9</span> <span class="token punctuation">(</span><span class="token number">9</span> <span class="token builtin">bytes</span><span class="token punctuation">)</span>
   bDescriptorType      <span class="token punctuation">:</span>    <span class="token number">0x2</span> Configuration
   wTotalLength         <span class="token punctuation">:</span>   <span class="token number">0x20</span> <span class="token punctuation">(</span><span class="token number">32</span> <span class="token builtin">bytes</span><span class="token punctuation">)</span>
   bNumInterfaces       <span class="token punctuation">:</span>    <span class="token number">0x1</span>
   bConfigurationValue  <span class="token punctuation">:</span>    <span class="token number">0x1</span>
   iConfiguration       <span class="token punctuation">:</span>    <span class="token number">0x0</span>
   bmAttributes         <span class="token punctuation">:</span>   <span class="token number">0x80</span> Bus Powered
   bMaxPower            <span class="token punctuation">:</span>   <span class="token number">0xfa</span> <span class="token punctuation">(</span><span class="token number">500</span> mA<span class="token punctuation">)</span>
    INTERFACE <span class="token number">0</span><span class="token punctuation">:</span> Printer <span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">=</span>
     bLength            <span class="token punctuation">:</span>    <span class="token number">0x9</span> <span class="token punctuation">(</span><span class="token number">9</span> <span class="token builtin">bytes</span><span class="token punctuation">)</span>
     bDescriptorType    <span class="token punctuation">:</span>    <span class="token number">0x4</span> Interface
     bInterfaceNumber   <span class="token punctuation">:</span>    <span class="token number">0x0</span>
     bAlternateSetting  <span class="token punctuation">:</span>    <span class="token number">0x0</span>
     bNumEndpoints      <span class="token punctuation">:</span>    <span class="token number">0x2</span>
     bInterfaceClass    <span class="token punctuation">:</span>    <span class="token number">0x7</span> Printer
     bInterfaceSubClass <span class="token punctuation">:</span>    <span class="token number">0x1</span>
     bInterfaceProtocol <span class="token punctuation">:</span>    <span class="token number">0x2</span>
     iInterface         <span class="token punctuation">:</span>    <span class="token number">0x0</span>
      ENDPOINT <span class="token number">0x2</span><span class="token punctuation">:</span> Bulk OUT <span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">=</span>
       bLength          <span class="token punctuation">:</span>    <span class="token number">0x7</span> <span class="token punctuation">(</span><span class="token number">7</span> <span class="token builtin">bytes</span><span class="token punctuation">)</span>
       bDescriptorType  <span class="token punctuation">:</span>    <span class="token number">0x5</span> Endpoint
       bEndpointAddress <span class="token punctuation">:</span>    <span class="token number">0x2</span> OUT
       bmAttributes     <span class="token punctuation">:</span>    <span class="token number">0x2</span> Bulk
       wMaxPacketSize   <span class="token punctuation">:</span>   <span class="token number">0x40</span> <span class="token punctuation">(</span><span class="token number">64</span> <span class="token builtin">bytes</span><span class="token punctuation">)</span>
       bInterval        <span class="token punctuation">:</span>    <span class="token number">0x0</span>
      ENDPOINT <span class="token number">0x81</span><span class="token punctuation">:</span> Bulk IN <span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">=</span>
       bLength          <span class="token punctuation">:</span>    <span class="token number">0x7</span> <span class="token punctuation">(</span><span class="token number">7</span> <span class="token builtin">bytes</span><span class="token punctuation">)</span>
       bDescriptorType  <span class="token punctuation">:</span>    <span class="token number">0x5</span> Endpoint
       bEndpointAddress <span class="token punctuation">:</span>   <span class="token number">0x81</span> IN
       bmAttributes     <span class="token punctuation">:</span>    <span class="token number">0x2</span> Bulk
       wMaxPacketSize   <span class="token punctuation">:</span>   <span class="token number">0x40</span> <span class="token punctuation">(</span><span class="token number">64</span> <span class="token builtin">bytes</span><span class="token punctuation">)</span>
       bInterval        <span class="token punctuation">:</span>    <span class="token number">0x0</span></code>`,!0),i(f);var p=o(f,4);t(p,()=>`<code class="language-python"><span class="token comment"># Detach kernel driver (if present, we cannot use the device if Linux already claimed it)</span>
<span class="token operator">>></span><span class="token operator">></span> dev<span class="token punctuation">.</span>detach_kernel_driver<span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>
<span class="token comment"># Initialize device</span>
<span class="token operator">>></span><span class="token operator">></span> dev<span class="token punctuation">.</span>set_configuration<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token operator">>></span><span class="token operator">></span> dev<span class="token punctuation">.</span>write<span class="token punctuation">(</span><span class="token number">0x2</span><span class="token punctuation">,</span> <span class="token string">b'&#92;x1b&#92;x69&#92;x53'</span><span class="token punctuation">)</span>
<span class="token number">3</span>
<span class="token operator">>></span><span class="token operator">></span> res <span class="token operator">=</span> dev<span class="token punctuation">.</span>read<span class="token punctuation">(</span><span class="token number">0x81</span><span class="token punctuation">,</span> <span class="token number">32</span><span class="token punctuation">)</span>
<span class="token operator">>></span><span class="token operator">></span> <span class="token builtin">bytes</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span>
<span class="token operator">>></span><span class="token operator">></span> res<span class="token punctuation">[</span><span class="token number">11</span><span class="token punctuation">]</span>
<span class="token number">1</span> <span class="token comment"># -> we got laminated tape</span>
<span class="token operator">>></span><span class="token operator">></span> res<span class="token punctuation">[</span><span class="token number">10</span><span class="token punctuation">]</span>
<span class="token number">24</span> <span class="token comment"># -> that is 24mm wide</span></code>`,!0),i(p),a(4),n(r,c)}export{v as default,c as metadata};
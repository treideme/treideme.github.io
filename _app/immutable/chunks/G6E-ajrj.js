import{$ as e,E as t,M as n,P as r,mt as i,pt as a,tt as o}from"./C5Qr1tWr.js";import"./xihTtKlq.js";import"./DSJ1rPnI.js";import{t as s}from"./DPw4rzvf.js";import"./BrJmRK04.js";import"./WppY4ym1.js";import"./BIw1C4rS.js";import{t as c}from"./DPsrAEoc.js";var l={title:`MCS-51 Real-World Interfacing - Infrared Data`,date:`2025-11-24`,updated:`2025-11-24`,categories:[`coding`,`embedded`,`8051`],coverImage:`/images/rft_selectron.jpg`,coverWidth:425,coverHeight:239,excerpt:`IrDA Interfacing.`},{title:u,date:d,updated:f,categories:p,coverImage:m,coverWidth:h,coverHeight:g,excerpt:_}=l,v=r(`<p>We looked at various forms of on-PCB serial communication with the MCS-51 / 8051 microcontroller family in previous posts: <a href="/blog/2025.10.29">UART</a>, <a href="/blog/2025.11.22">Dallas 1-Wire</a>, and <a href="/blog/2025.11.23">Philips I2C</a>. Now, let’s look at the pinnacle
of short-range wireless interfacing from the 1970s and 1980s: the Infrared Data Association (IrDA).</p> <p>Growing up in East Germany in the 1980s, infrared remote controls were the exception. You had to walk up to the TV set
to change the channel or volume. Due to communist five-year planning and exorbitant TV set prices, most families only had one TV set
in the household, which was usually quite dated. We had a <a href="https://www.scheida.at/scheida/Televisionen_DDRFarbfernseher.htm" rel="nofollow">Choromat 2160</a> from 1978 that lasted well into the 1990s. It had mechanical push-buttons on the front panel for channel selection and volume control.
There was one mechanical tuner to set the desired channel frequency for eight radio buttons (i.e., your saved channels).</p> <!> <p>However, my aunt, a college student at the time, was an aspiring electronics engineer. As an electronics person, she had the chance
to end up in one of two prestigious East German companies: RFT (Rundfunk- und Fernmelde-Technik) or Robotron (the company that
reverse engineered the <a href="https://www.youtube.com/watch?v=cxrkC-pMH_s" rel="nofollow">Z80 from Toshiba wafers</a>). With proper East German
hands-on education, she ended up doing work
terms at RFT in the 80s. Suddenly, my great-grandma, my grandma, and other family members had a TV set with a remote control.
I was a kid, but I gather they were not subject to an employee discount under socialism. The pinnacle back then was
the <a href="https://www.scheida.at/scheida/Televisionen_DDRFarbfernseher.htm" rel="nofollow">RFT Colormat 4516</a> with the <code>Selectron-01</code> remote
control shown above.</p> <p>Outside East Germany, infrared remote controls were becoming more common in the West in the late 70s and early 80s.
It was a huge improvement over previous remote control technologies that used ultrasonic sound waves or radio frequency (RF) signals.
Anyone who had dogs at home got the right feedback whenever changing channels with these.</p> <h1 id="irda-basics"><a aria-hidden="true" tabindex="-1" href="#irda-basics"><span class="icon icon-link"></span></a>IrDA Basics</h1> <p>Before 1994, there was no standardized way for devices to communicate using infrared light. Every vendor pretty much
rolled out their own protocol. The Infrared Data Association (IrDA) was formed in 1993 by a group of companies to create
a standard for infrared communication. The first IrDA standard was released in 1994, defining the physical layer, data link layer,
and application layer protocols for infrared communication.</p> <p>From a hardware perspective, you need an infrared LED to transmit data and a photodiode or phototransistor to receive data.
To avoid adjacent channel interference, most receivers also have an optical filter that only allows infrared light at a specific wavelength
to pass through. The most common wavelength for IrDA communication is 850 nm. This is close enough to the quantum efficiency
of most CMOS and CCD sensors, so if you ever need to debug a transmitter, point it at a digital camera or smartphone camera.</p> <p>You can build a simple pulse former for the receiver out of a transistor circuit, or simply buy a photo module. A
common receiver is the <a href="/images/tsop_17.pdf">TSOP17-Series</a> by Vishay. It has a built-in bandpass filter and demodulator
circuitry. It can decode modulated IR signals at 36 kHz, 38 kHz, 40 kHz, or 56 kHz carrier frequencies. The module outputs
a digital signal that can be read directly by a microcontroller. Again, if you look at photodetectors in <a href="https://www.lcsc.com/category/1262.html" rel="nofollow">LCSC</a>,
you will find a plethora of options. The issue is you need a matching bandpass filter for the carrier frequency you pick.</p> <!> <p>One issue to be aware of is modulation. To be immune to ambient light interference, IrDA communication uses
a modulated signal. Given the possibility of interference from other light sources, the IrDA standard uses a modulation frequency of 38 kHz,
which is high enough to avoid most ambient light interference but low enough to be easily generated and detected by simple electronics.</p> <p>Once you have pulse forming set up, the next question is how to reliably code the signal so we can recover it on the other side.
Vishay has a good application note on <a href="https://www.vishay.com/docs/80071/dataform.pdf" rel="nofollow">IR Protocols</a> that covers various protocols.</p> <p>Looking at the HC6800-ES2 kit that we have been using for MCS-51 experiments, it has what looks like a TSOP17 module and
also came with a simple infrared remote control. However, the documentation does not say much about what modulation frequency
is chosen, or if this is actually a genuine Vishay part or a clone. So we trust the makers that they figured out the
right modulation frequency.</p> <!> <p>So the only thing we can use on <code>P3.2</code> to assist with this is the external interrupt <code>INT0</code>. Now the question remains:
what protocol?</p> <h1 id="nec-protocol"><a aria-hidden="true" tabindex="-1" href="#nec-protocol"><span class="icon icon-link"></span></a>NEC Protocol</h1> <p>If we were to take it easy, we would just scrap the MCS-51 in favour of something that does C++ and port the <a href="https://github.com/Arduino-IRremote/Arduino-IRremote" rel="nofollow">IRremote library</a> to that. However, that would not be in the
spirit of this blog series. So we reverse-engineer the remote control protocol by capturing the signals with a logic
analyzer. For that, I wrote a simple infinite program that just pulls <code>P3.2</code> high and has a logic analyzer capture
the signal whenever a button is pressed on the remote control. The trace looks as follows.</p> <!> <p>Honing in, the big telltale sign seems to be the valley at the beginning that is about 9 ms long, followed by what looks
like a sync pulse of about 4.5 ms. This is followed by a series of patterns that are either about 2250 µs long or about
1125 µs long. Then there is some form of repeat code every 100 ms. A quick web search pulled <a href="https://www.sbprojects.net/knowledge/ir/nec.php" rel="nofollow">this up</a>. It looks like we have the classic NEC protocol here, however,
inverted by polarity. The NEC protocol uses pulse distance encoding to represent bits. Each bit consists of a fixed-length
pulse followed by a variable-length space. A logical ‘0’ is represented by a 562.5 microsecond pulse followed by a 562.5
microsecond space, while a logical ‘1’ is represented by a 562.5 microsecond pulse followed by a 1,687.5 microsecond space.
The NEC protocol starts with a 9 ms leading pulse burst (the valley we see) followed by a 4.5 ms space (the sync pulse).</p> <!> <p>The successor of NEC, Renesas, wants to sell you a <a href="https://www.renesas.com/en/document/apn/1184-remote-control-ir-receiver-decoder" rel="nofollow">programmable logic device to decode this</a>,
but we are dealing with a microcontroller design here that dates back to the times when <a href="https://www.instagram.com/kiana_tom_flexappeal_fitmomtv/?hl=en" rel="nofollow">Kiana Tom</a> was just beginning to experiment with Body Shaping courses on TV. We have an archaic 8-bit microcontroller with an
external interrupt pin and various internal timers. So let’s roll our own decoder.</p> <p>One approach proposed <a href="https://exploreembedded.com/wiki/NEC_IR_Remote_Control_Interface_with_8051" rel="nofollow">here</a> is to use a
resettable timer to measure the pulse widths. Since we are dealing with an inverted signal, we set up the external interrupt
to trigger on the falling edge and have a free-running timer in the background that measures <code>ms</code> intervals.</p> <ol><li>Whenever the timer overflows, we increment a global millisecond counter up to a maximum.</li> <li>If the falling edge occurs, we copy the <code>ms</code> counter and reset it to zero.</li> <li>If <code>ms</code> exceeds the maximum interval for a pattern, we consider this the start of a frame and start counting pulses, ignoring the first two edges of the sync pattern.</li> <li>If a pulse exceeds <code>2 ms</code>, we consider this a logical ‘1’; otherwise, a logical ‘0’.</li> <li>After receiving 32 bits, we lock it in.</li></ol> <p>We have slightly different timing due to the external <code>12 MHz</code>. We also embrace open-source <a href="https://sdcc.sourceforge.net/" rel="nofollow">SDCC</a> as our toolchain of choice,
not Keil. So here is the code to set up the timer and external interrupt.</p> <p>We can use <a href="/tools">The timer Tool</a> to come up with
a <code>1 ms</code> timer configuration.</p> <ul><li><code>12 MHz</code>, <code>12 T</code> mode</li> <li>Timer 0 in <code>16-bit</code> mode</li> <li><code>1 ms</code> target interval</li></ul> <pre class="language-c"></pre> <p>Use the <a href="/tools">Interrupt Tool</a> to set up the external interrupt on <code>P3.2</code> for falling edge triggering.</p> <ul><li>Enable <code>INT0</code> <code>P3.2</code> falling edge.</li></ul> <pre class="language-c"></pre> <p>For the timer interrupt service routine (ISR), we just toggle a heartbeat LED on <code>P3.4</code> and increment the <code>ms</code> counter
up to a maximum of <code>50 ms</code>. The <code>P3.4</code> toggle was mapped to the logic analyzer to help with debugging. I had issues
where <code>stcgal</code> would sometimes put the <code>MCU</code> in <code>6T</code> mode instead of <code>12T</code> mode, messing up the timing. The heartbeat
helped verify that the timer interrupt was firing at the expected rate.</p> <pre class="language-c"></pre> <p>The external interrupt ISR is more involved. We copy the current <code>ms</code> counter, reset it for the next pulse, and then
process the pulse based on the current state. If the <code>ms</code> counter was <code>50</code>, we consider this a timeout and assume
a sync pulse. We reset the pulse counter and pattern. If we are within the first <code>31</code> pulses after sync,
we record the bits based on the pulse width. After <code>32</code> bits, we lock in the pattern.</p> <pre class="language-c"></pre> <p>Then we recycle the main from the <a href="/blog/2025.11.15">7-Segment Display</a> post to display the received pattern
on the 8-digit 7-segment display. For initialization, we set the pattern to <code>0xFFFFFFFF</code> to indicate no valid
pattern has been received yet.</p> <pre class="language-c"></pre> <!><br/> <h1 id="summary"><a aria-hidden="true" tabindex="-1" href="#summary"><span class="icon icon-link"></span></a>Summary</h1> <p>As for the East German TVs, these lasted well into the 2000s. Unfortunately, RFT did not. In a sad turn of events,
after several rounds of restructuring,
they were eventually acquired by <a href="https://www.technisat.de/" rel="nofollow">TechniSat</a> as a hollow shell of what they once were in 1998.</p> <p>One of the first things that died, even before the 90s, were partnerships with East German universities and hands-on
training programs. In the end, my aunt did not become an electronics engineer when the program was scrapped. So not
everyone got the uplift from the fall of the Iron Curtain. While everyone else east of it got to enjoy recycled 70s
and 80s Western TV series and dubbed Kiana Tom and Cindy Crawford fitness videos on TV …</p> <!><br/> <p>… with remote in hand. Full source code <a href="https://github.com/treideme/stc89c52-demos/tree/main/08_irda" rel="nofollow">here</a></p> <ul><li><a href="https://www.scheida.at/scheida/Televisionen_DDRFarbfernseher.htm" rel="nofollow">Encyclopedia of all East German TV Models</a></li> <li><a href="https://exploreembedded.com/wiki/NEC_IR_Remote_Control_Interface_with_8051" rel="nofollow">Keil IR Remote Example</a></li></ul>`,1);function y(r){var l=v(),u=o(e(l),4);s(u,{src:`/images/colormat_4510A.jpg`,width:`425`});var d=o(u,14);s(d,{src:`/images/tsop17.png`,width:`300`});var f=o(d,8);s(f,{src:`/images/hc6800-irda.png`,width:`200`});var p=o(f,8);s(p,{src:`/images/8051_ir_trace.png`,width:`600`});var m=o(p,4);s(m,{src:`/images/nec_ir_protocol.png`,width:`600`});var h=o(m,14);t(h,()=>`<code class="language-c"><span class="token keyword">void</span> <span class="token function">timer0_init</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
  TMOD <span class="token operator">&amp;=</span> <span class="token number">0xF0</span><span class="token punctuation">;</span>	<span class="token comment">/* Clear Timer 0 mode bits */</span>
  TMOD <span class="token operator">|=</span> <span class="token number">0x1</span><span class="token punctuation">;</span>	<span class="token comment">/* Set Timer 0 mode to 16-bit */</span>
  TH0 <span class="token operator">=</span> <span class="token number">0xfc</span><span class="token punctuation">;</span>	<span class="token comment">/* Set Timer 0 high byte for 16-bit mode */</span>
  TL0 <span class="token operator">=</span> <span class="token number">0x18</span><span class="token punctuation">;</span>	<span class="token comment">/* Set Timer 0 low byte for 16-bit mode */</span>
  TF0 <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>	<span class="token comment">/* Clear Timer 0 overflow flag */</span>
  TR0 <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>	<span class="token comment">/* Start Timer 0 */</span>

  <span class="token comment">// Also enable interrupt</span>
  ET0 <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span></code>`,!0),i(h);var g=o(h,6);t(g,()=>`<code class="language-c"><span class="token keyword">void</span> <span class="token function">ext_init</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
  IT0 <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>	<span class="token comment">/* INT0 (P3.2) Falling Edge */</span>
  EX0 <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>	<span class="token comment">/* Enable INT0 (P3.2) */</span>
<span class="token punctuation">&#125;</span></code>`,!0),i(g);var _=o(g,4);t(_,()=>`<code class="language-c"><span class="token class-name">uint8_t</span> ms_counter <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token class-name">int8_t</span> pulse_count <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token class-name">uint32_t</span> pattern <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token class-name">uint32_t</span> last_pattern <span class="token operator">=</span> <span class="token number">0xFFFFFFFF</span><span class="token punctuation">;</span>

<span class="token keyword">void</span> <span class="token function">tf0_isr</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token punctuation">)</span> <span class="token function">__interrupt</span><span class="token punctuation">(</span>TF0_VECTOR<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
  P3_4 <span class="token operator">=</span> <span class="token operator">!</span>P3_4<span class="token punctuation">;</span> <span class="token comment">// Heartbeat on P3.3</span>
  <span class="token comment">// Reload Timer 0 for next interrupt</span>
  TH0 <span class="token operator">=</span> <span class="token number">0xfc</span><span class="token punctuation">;</span>	<span class="token comment">/* Set Timer 0 high byte for 16-bit mode */</span>
  TL0 <span class="token operator">=</span> <span class="token number">0x18</span><span class="token punctuation">;</span>	<span class="token comment">/* Set Timer 0 low byte for 16-bit mode */</span>
  <span class="token keyword">if</span><span class="token punctuation">(</span>ms_counter<span class="token operator">&lt;</span><span class="token number">50</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
    ms_counter<span class="token operator">++</span><span class="token punctuation">;</span>
  <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span></code>`,!0),i(_);var y=o(_,4);t(y,()=>`<code class="language-c"><span class="token keyword">void</span> <span class="token function">int0_isr</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token punctuation">)</span> <span class="token function">__interrupt</span><span class="token punctuation">(</span>IE0_VECTOR<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
  <span class="token class-name">uint8_t</span> cur_timer <span class="token operator">=</span> ms_counter<span class="token punctuation">;</span>

  <span class="token comment">// Reset for next pulse (including resetting timer)</span>
  ms_counter <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
  TH0 <span class="token operator">=</span> <span class="token number">0xfc</span><span class="token punctuation">;</span>	<span class="token comment">/* Set Timer 0 high byte for 16-bit mode */</span>
  TL0 <span class="token operator">=</span> <span class="token number">0x18</span><span class="token punctuation">;</span>	<span class="token comment">/* Set Timer 0 low byte for 16-bit mode */</span>

  pulse_count<span class="token operator">++</span><span class="token punctuation">;</span>

  <span class="token keyword">if</span><span class="token punctuation">(</span>cur_timer <span class="token operator">==</span> <span class="token number">50</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
    <span class="token comment">// Timeout occurred, assume sync pulse</span>
    pulse_count <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">2</span><span class="token punctuation">;</span> <span class="token comment">// Ignore sync edges</span>
    pattern <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>      <span class="token comment">// Reset pattern</span>
  <span class="token punctuation">&#125;</span> <span class="token keyword">else</span> <span class="token keyword">if</span><span class="token punctuation">(</span>pulse_count <span class="token operator">>=</span> <span class="token number">0</span> <span class="token operator">&amp;&amp;</span> pulse_count <span class="token operator">&lt;</span> <span class="token number">31</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
    <span class="token comment">// Record bits after sync</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>cur_timer<span class="token operator">>=</span> <span class="token number">2</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span> <span class="token comment">// Threshold between 0 and 1</span>
      pattern <span class="token operator">|=</span> <span class="token number">0x00000001</span> <span class="token operator">&lt;&lt;</span> <span class="token punctuation">(</span><span class="token number">31</span> <span class="token operator">-</span> pulse_count<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// MSB first</span>
    <span class="token punctuation">&#125;</span>
  <span class="token punctuation">&#125;</span>
  <span class="token keyword">if</span><span class="token punctuation">(</span>pulse_count <span class="token operator">>=</span> <span class="token number">32</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
    <span class="token comment">// Ignore extra pulses</span>
    last_pattern <span class="token operator">=</span> pattern<span class="token punctuation">;</span>
  <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span></code>`,!0),i(y);var b=o(y,4);t(b,()=>`<code class="language-c"><span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
  <span class="token function">timer0_init</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">ext_init</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  EA <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> <span class="token comment">// Enable global interrupts</span>

  P0 <span class="token operator">=</span> <span class="token number">0x00</span><span class="token punctuation">;</span> <span class="token comment">// Initialize port</span>
  P2 <span class="token operator">=</span> <span class="token number">0x00</span><span class="token punctuation">;</span>

  <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
    <span class="token comment">// Display hex digits 0-7 with decimal point on, incrementing on each digit</span>
    <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token class-name">uint8_t</span> i<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span> i<span class="token operator">&lt;</span><span class="token number">8</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
      P2 <span class="token operator">=</span> i<span class="token operator">&lt;&lt;</span><span class="token number">2</span><span class="token punctuation">;</span> <span class="token comment">// activate digit i (P2_2..P2_4)</span>

      <span class="token comment">// Figure out the corresponding nibble in the 32-bit code</span>
      <span class="token class-name">uint8_t</span> nibble <span class="token operator">=</span> <span class="token punctuation">(</span>last_pattern <span class="token operator">>></span> i<span class="token operator">*</span><span class="token number">4</span><span class="token punctuation">)</span> <span class="token operator">&amp;</span> <span class="token number">0x0F</span><span class="token punctuation">;</span>
      LED_DIGIT <span class="token operator">=</span> segment_map<span class="token punctuation">[</span>nibble<span class="token punctuation">]</span><span class="token punctuation">;</span>
      <span class="token function">delay</span><span class="token punctuation">(</span><span class="token number">200</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Short delay for multiplexing</span>
      LED_DIGIT <span class="token operator">=</span> <span class="token number">0x00</span><span class="token punctuation">;</span> <span class="token comment">// Turn off all segments</span>
    <span class="token punctuation">&#125;</span>
  <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span></code>`,!0),i(b);var x=o(b,2);s(x,{src:`/images/8051_ir_receiver.jpg`,width:`600`});var S=o(x,9);c(S,{id:`IQJ6HXlFSz4`,width:`600`,height:`400`}),a(5),n(r,l)}export{y as default,l as metadata};
import{$ as e,E as t,F as n,M as r,P as i,mt as a,pt as o,tt as s}from"./C5Qr1tWr.js";import"./xihTtKlq.js";import"./DSJ1rPnI.js";import{t as c}from"./DPw4rzvf.js";import{t as l}from"./BrJmRK04.js";import"./WppY4ym1.js";import"./BIw1C4rS.js";import"./DPsrAEoc.js";var u={title:`MCS-51 Real-World interfacing - 7 Segment Displays`,date:`2025-11-15`,updated:`2025-11-15`,categories:[`coding`,`embedded`,`8051`],coverImage:`/images/spartus.jpg`,coverWidth:676,coverHeight:437,excerpt:`7-segment displays.`},{title:d,date:f,updated:p,categories:m,coverImage:h,coverWidth:g,coverHeight:_,excerpt:v}=u,y=i(`<!> <p>My great-grandparents got one of these watches back in the late 1970s. It was not quite the Spartus digital watch
shown above, but rather an East German clone of the same design (including the fake wood grain). This clock survived until,
unfortunately, my great-grandmother passed away about 10 years ago, and it disappeared when her estate was settled.</p> <p>I used to hear stories about how that clock went everywhere with them: vacations, great-grandpa’s hospital stays, chemotherapy, until it found its permanent
residence in my grandmother’s living room after my great-grandpa passed away from cancer in the early 80s. For folks
who grew up in the true analog world, greeting the German Emperor as kids, making it through WW2, and then witnessing
the rise and fall of the Iron Curtain, this clock was truly a symbol of modernity and progress. For me, it was
great-grandpa—a symbol of a man who suddenly disappeared from my life when I was just a toddler.
If you ask kids today, it will be perceived as an unloved piece of junk at a yard sale.</p> <p>In fact, <a href="https://www.youtube.com/watch?v=cxrkC-pMH_s" rel="nofollow">East Germany bankrupted itself</a> trying to keep up with the chip wars and
perception of modernity in the 70s and 80s. We were the Silicon Valley of the Eastern Bloc, but the fall of the Iron Curtain
and German reunification did not bail out the industry.</p> <p>So, keeping up with the retro blog and the <a href="/blog/2025.10.19">apparent appetite</a> for classic embedded systems design, let’s look at some
real-world interfacing with MCS-51 series microcontrollers.</p> <h1 id="7-segment-displays"><a aria-hidden="true" tabindex="-1" href="#7-segment-displays"><span class="icon icon-link"></span></a>7-Segment Displays</h1> <p>Segmented displays have been around for over a century, with the first patents dating back to the early 1900s. With
Vacuum Fluorescent Display (VFD) technology becoming popular in the 1950s and 60s, 7-segment displays became a staple
in digital clocks, calculators, and other electronic devices. The introduction of LEDs in the late 1960s further revolutionized
display technology, making 7-segment displays a staple from NASA spacecraft to VCRs (shown below).</p> <!><br/> <p>Compared to discrete <a href="/blog/2025.11.01">LED illumination</a>, 7-segment displays offer a more compact and efficient way to display
numerical information without the loss of contrast seen in other display types. They are easy to read from a distance
or in challenging lighting conditions (e.g., outdoors, vending machines, household appliances, …).</p> <p>The displays typically consist of seven segments (labeled A to G) arranged in a figure-eight pattern, along with an optional decimal point (DP).
Each segment can be individually controlled to create various numerical digits (0-9) and some alphabetic characters, as
shown below. They typically come in two configurations: common anode and common cathode. In a common anode display, all the anodes of the segments are connected together,
while in a common cathode display, all the cathodes are connected together. This configuration affects how you control the segments
using the microcontroller. The segments typically come in blocks of 4, 8, or even 12 digits, and can be driven directly from the microcontroller.</p> <!><br/> <p>Considering the challenges discussed in the previous post about conserving pins, we also need to consider how to drive multiple digits
with limited I/O pins. One common method is to use multiplexing, where each digit is activated one at a time in rapid succession.
This creates the illusion of all digits being lit simultaneously to the human eye, while only one digit is actually lit at any given moment.
This technique significantly reduces the number of I/O pins required to control multiple digits. In essence, you need to set the
segments and then select the right digit to display it on.</p> <p>Staying with the HC680-ES2 development board from the previous post, we can connect an 8-digit 7-segment display to the microcontroller
using the following pin configuration:</p> <!><br/> <p>We use a <a href="https://www.ti.com/lit/ds/symlink/sn74hc138.pdf" rel="nofollow">74HC138</a> 3-to-8 line decoder to select which digit to activate, while the segments are connected to
a buffer <a href="https://www.ti.com/lit/ds/symlink/sn74hc245.pdf" rel="nofollow">74HC245</a> to drive the segments. To avoid aliasing issues, the segments should be deactivated every time the
digit is switched. Since 8 bits are needed to encode the 7 segments plus the decimal point, we can use a single byte
to represent the segments to be lit. So the best way to do this for an MCU is to wire up an 8-bit GPIO port to the segments.
To map the segments efficiently to digits, we can use a lookup table (LUT) to map each digit (0-9) to its corresponding segment pattern.</p> <!><br/> <p>Since A-G and DP are mapped to bits 0-7 of the byte, we can create a LUT as follows:</p> <pre class="language-c"></pre> <p>Now, just to test it, let’s start with a simple hex counter on the first digit. By default, the 3-to-8 decoder is already
mapped to <code>LED8</code>, so we can just interact with <code>P0</code> to test the segments.</p> <pre class="language-c"></pre> <p>The end result looks as follows:</p> <!><br/> <p>The full source can be found on <a href="https://github.com/treideme/stc89c52-demos/tree/main/02_7_segment" rel="nofollow">GitHub</a>.</p> <p>Now, onto mapping multiple digits. We can simply shift the desired digit to <code>P2.2-P2.4</code> to select the digit to display
on every iteration. To avoid flickering, we need to cycle through all digits rapidly. Here is a simple implementation
that displays a counting number on all 8 digits:</p> <pre class="language-c"></pre> <p>The end result looks as follows for the short delay (fast multiplexing):</p> <!><br/> <p>If you slow it down enough, you can see the multiplexing effect:</p> <!><br/> <p>The full source can be found on <a href="https://github.com/treideme/stc89c52-demos/tree/main/02_7_segment_dyn" rel="nofollow">GitHub</a>.</p> <h1 id="odd-hardware-issues"><a aria-hidden="true" tabindex="-1" href="#odd-hardware-issues"><span class="icon icon-link"></span></a>Odd Hardware Issues</h1> <p>Okay, there is an interesting problem with the 7-segment display on the HC6800-ES2 board. The segments mapped to <code>P0.5</code> and <code>P0.6</code> show correlated failures. Whenever <code>P0.6</code> is low, it pulls <code>P0.5</code> low as well. This is not a software issue,
as I have tested this with a simple loop that toggles these pins independently. Extensive component testing revealed
that the fault was solder residue. Given the <code>$20 CAD</code> price point of the board in 2020, I cannot complain too
much. After cleaning the board with
hexane (brake cleaner) and a brush, the issue disappeared. There was a <code>300 Ohm</code> resistance between the two pins
when measured with a multimeter before cleaning. So, if you ever run into weird correlated pin issues on these boards,
try cleaning them first. The vendor of the dev kit should invest maybe another <code>$1 CAD</code> per board into ultrasonic
residue cleaning.</p> <h1 id="conclusion"><a aria-hidden="true" tabindex="-1" href="#conclusion"><span class="icon icon-link"></span></a>Conclusion</h1> <p>7-segment displays are a classic and effective way to display numerical information in embedded systems.
By using multiplexing techniques and lookup tables, we can efficiently control multiple digits with limited I/O pins.
Even though there is a serious retro vibe to these displays, they are still widely used in various applications where
contrast and readability are essential. In the next posts in the series, we will look at dot-matrix and character LCDs.</p> <p>Further down the road, I want to wrap up the MCS-51 series with a custom design that revives the above clock.</p>`,1);function b(i){var u=y(),d=e(u);l(d,{children:(e,t)=>{o();var i=n(`If you had one of these babies back in the day, you cannot skip Karate warmups anymore!`);r(e,i)},$$slots:{default:!0}});var f=s(d,14);c(f,{src:`/images/grundig_vcr.jpg`,width:`500`});var p=s(f,7);c(p,{src:`/images/CL3641AH.png`,width:`400`});var m=s(p,7);c(m,{src:`/images/8051_7seg_iface.png`,width:`900`});var h=s(m,5);c(h,{src:`/images/8051_seg_labels.png`,width:`350`});var g=s(h,5);t(g,()=>`<code class="language-c"><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;stdint.h></span></span>

<span class="token keyword">const</span> <span class="token class-name">uint8_t</span> segment_map<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">&#123;</span>
  <span class="token comment">//dGFEDCBA</span>
  <span class="token number">0</span>b00111111<span class="token punctuation">,</span> <span class="token comment">// 0</span>
  <span class="token number">0</span>b00000110<span class="token punctuation">,</span> <span class="token comment">// 1</span>
  <span class="token number">0</span>b01011011<span class="token punctuation">,</span> <span class="token comment">// 2</span>
  <span class="token number">0</span>b01001111<span class="token punctuation">,</span> <span class="token comment">// 3</span>
  <span class="token number">0</span>b01100110<span class="token punctuation">,</span> <span class="token comment">// 4</span>
  <span class="token number">0</span>b01101101<span class="token punctuation">,</span> <span class="token comment">// 5</span>
  <span class="token number">0</span>b01111101<span class="token punctuation">,</span> <span class="token comment">// 6</span>
  <span class="token number">0</span>b00000111<span class="token punctuation">,</span> <span class="token comment">// 7</span>
  <span class="token number">0</span>b01111111<span class="token punctuation">,</span> <span class="token comment">// 8</span>
  <span class="token number">0</span>b01101111<span class="token punctuation">,</span> <span class="token comment">// 9</span>
  <span class="token number">0</span>b01110111<span class="token punctuation">,</span> <span class="token comment">// A</span>
  <span class="token number">0</span>b01111100<span class="token punctuation">,</span> <span class="token comment">// b</span>
  <span class="token number">0</span>b00111001<span class="token punctuation">,</span> <span class="token comment">// C</span>
  <span class="token number">0</span>b01011110<span class="token punctuation">,</span> <span class="token comment">// d</span>
  <span class="token number">0</span>b01111001<span class="token punctuation">,</span> <span class="token comment">// E</span>
  <span class="token number">0</span>b01110001<span class="token punctuation">,</span> <span class="token comment">// F</span>
<span class="token punctuation">&#125;</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> <span class="token class-name">uint8_t</span> segment_dp <span class="token operator">=</span> <span class="token number">0</span>b10000000<span class="token punctuation">;</span> <span class="token comment">// Decimal point segment</span></code>`,!0),a(g);var _=s(g,4);t(_,()=>`<code class="language-c"><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">LED_DIGIT</span> <span class="token expression">P0</span></span>

<span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
  <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
    <span class="token comment">// Display hex digits 0-F with decimal point on</span>
    <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token class-name">uint8_t</span> i<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span> i<span class="token operator">&lt;</span><span class="token number">16</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
      LED_DIGIT <span class="token operator">=</span> segment_map<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">|</span> segment_dp<span class="token punctuation">;</span> <span class="token comment">// Display digit with decimal point</span>
      <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token class-name">uint16_t</span> j<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span> j<span class="token operator">&lt;</span><span class="token number">60000</span><span class="token punctuation">;</span> j<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Simple delay</span>
      LED_DIGIT <span class="token operator">=</span> <span class="token number">0x00</span><span class="token punctuation">;</span> <span class="token comment">// Turn off all segments</span>
    <span class="token punctuation">&#125;</span>
  <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span></code>`,!0),a(_);var v=s(_,4);c(v,{src:`/images/8051_7seg_single.gif`,width:`500`});var b=s(v,7);t(b,()=>`<code class="language-c"><span class="token keyword">void</span> <span class="token function">delay</span><span class="token punctuation">(</span><span class="token class-name">uint16_t</span> t<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
  <span class="token keyword">while</span> <span class="token punctuation">(</span>t<span class="token operator">--</span><span class="token punctuation">)</span>
    <span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span>

<span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
  P0 <span class="token operator">=</span> <span class="token number">0x00</span><span class="token punctuation">;</span> <span class="token comment">// Initialize port</span>
  P2 <span class="token operator">=</span> <span class="token number">0x00</span><span class="token punctuation">;</span>

  <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
    <span class="token comment">// Display hex digits 0-7 with decimal point on, incrementing on each digitit</span>
    <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token class-name">uint8_t</span> i<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span> i<span class="token operator">&lt;</span><span class="token number">8</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
      P2 <span class="token operator">=</span> i<span class="token operator">&lt;&lt;</span><span class="token number">2</span><span class="token punctuation">;</span> <span class="token comment">// activate digit i (P2_2..P2_4)</span>
      LED_DIGIT <span class="token operator">=</span> segment_map<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">|</span> segment_dp<span class="token punctuation">;</span> <span class="token comment">// Display digit with decimal point</span>
      <span class="token function">delay</span><span class="token punctuation">(</span><span class="token number">200</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Short delay for multiplexing</span>
<span class="token comment">//      delay(60000); // Long delay to make multiplexing visible</span>
      LED_DIGIT <span class="token operator">=</span> <span class="token number">0x00</span><span class="token punctuation">;</span> <span class="token comment">// Turn off all segments</span>
    <span class="token punctuation">&#125;</span>
  <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span></code>`,!0),a(b);var x=s(b,4);c(x,{src:`/images/8051_7seg_dyn.png`,width:`500`});var S=s(x,5);c(S,{src:`/images/8051_7seg_dyn.gif`,width:`500`}),o(13),r(i,u)}export{b as default,u as metadata};
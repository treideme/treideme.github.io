import{$ as e,E as t,M as n,P as r,mt as i,pt as a,tt as o}from"./C5Qr1tWr.js";import"./xihTtKlq.js";import"./DSJ1rPnI.js";var s={title:`On Designing Boot Loaders and Grey-box-Testing Firmware (Part 2/2)`,date:`2010-02-08`,updated:`2025-10-04`,categories:[`embedded`,`gradschool`],coverImage:`/images/coldfire.jpg`,coverWidth:200,coverHeight:200,excerpt:`Bootloader for Freescale Coldfire.`},{title:c,date:l,updated:u,categories:d,coverImage:f,coverWidth:p,coverHeight:m,excerpt:h}=s,g=r(`<p>In the past tutorial, we have established how to integrate two pieces of code together, exemplifying a bootloader and
firmware interaction. The difference to the previous scenario is that in a test-suite, you actually need to maintain a
symmetric interaction among those two different pieces of code. There are several approaches how this can be achieved.</p> <ul><li>Explicitly pin each data-structure to specific locations in the memory. So each of the code pieces knows where to look for the others code and data.</li> <li>Pin an entry point of the firmware to a specific memory section that registers tests in another shared memory section.</li> <li>Pin an entry point of the firmware to a specific memory section that registers tests in a data-structure provided by the test-suite.</li></ul> <p>Looking at the different options it becomes apparent, why we talk about “grey-box testing”. In all cases we need to know
some memory sections within the other pieces of code. The approaches differ by the number of memory sections required to
be pinned. In addition, you might want to load tests dynamically through the boot loader requiring additional pinned
sections.</p> <h1 id="step-one-how-to-customize-the-locations-of-code-and-data"><a aria-hidden="true" tabindex="-1" href="#step-one-how-to-customize-the-locations-of-code-and-data"><span class="icon icon-link"></span></a>Step One: How to Customize the Locations of Code and Data</h1> <p>In principle you want to place individual data structures and code into labelled memory sections, defining the location
and label in the linker script and referencing label in GCC for the linker. The attribute-section paradigm allows us
to do so. Suppose we want to load a function called test into a block of memory at an absolute address. First, we need
to define this memory section in the linker script as follows:</p> <pre class="language-undefined"></pre> <p>Second, we need to reference this section in the code. This is done by declaring an attribute in the function’s specification as follows:</p> <pre class="language-undefined"></pre> <p>The listing shows that the function is indeed stored at that particular location.</p> <pre class="language-undefined"></pre> <p>Likewise global data structures and variables can be stored at such particular locations.</p> <pre class="language-c"></pre> <h1 id="step-two-designing-the-tests"><a aria-hidden="true" tabindex="-1" href="#step-two-designing-the-tests"><span class="icon icon-link"></span></a>Step Two: Designing the Tests</h1> <p>We proposed three options for the test integration in the introduction.</p> <h2 id="option-one-naïve-tell-everything"><a aria-hidden="true" tabindex="-1" href="#option-one-naïve-tell-everything"><span class="icon icon-link"></span></a>Option One: (Naïve) Tell everything</h2> <p>The first naïve approach is to actually pin each testable primitive and global data structure to a particular memory
region. In this scenario, all entry points to these primitives and global data structures are declared in the linker
script of the test code. The linker script of the firmware declares all of those sections and the primitives are pinned
to these sections using the attribute-section paradigm. This approach reduces the overhead of implementing tests vastly,
since all locations are defined and no futher registration of the firmware with the tests is needed. Expected results
can be directly checked against the data structures. However, maintaining the linker scripts in-sync, handling
fragmentation of the firmware code (i.e., huge gaps between the declared sections) and changing the firmware code
incur at significant overhead.</p> <h2 id="option-two-let-the-firmware-register-with-a-global-data-structure"><a aria-hidden="true" tabindex="-1" href="#option-two-let-the-firmware-register-with-a-global-data-structure"><span class="icon icon-link"></span></a>Option Two: Let the Firmware Register with a Global Data Structure</h2> <p>This approach is geared to minimize the overhead of maintaining the memory locations. In this scenario the firmware
voluntarily registers with the test code, placing the information into a shared data-structure. In this scenario, two
locations need to be shared across the firmware and the test-code.</p> <ul><li>The location of the registration routine that is to be implemented by the firmware code.</li> <li>The location of the global data structure that contains the test information.</li></ul> <p>In addition the specification of the test data structure as well as the registration interface need to be shared among
the two pieces of code. This can be achieved by sharing a common header file.</p> <p>This scenario is useful when the test information is known beforehand. It also enables testing slightly modified
versions of the firmware because the test code does not need to be aware of the location of the primitives or data
structures. The firmware voluntarily provides this information through the registration routine. Both linker scripts
define the section of the global data structure. Both linker scripts define the sections of the global data structure
and registration routine. In order to avoid adverse effects the test code may prevent explicit writing to the
registration routine. Here the test linker script:</p> <pre class="language-undefined"></pre> <p>And the firmware linker script looks like this:</p> <pre class="language-undefined"></pre> <p>The shared header among the firmware and the test code defining the structure of the shared data structure and the
registration interface:</p> <pre class="language-undefined"></pre> <p>The test code inside the <code>bootloader</code> simply registers with the firmware and invokes the required primitives of
the firmware:</p> <pre class="language-c"></pre> <p>The location of the registration code inside the firmware is pinned as follows:</p> <pre class="language-undefined"></pre> <p>Merging the test suite with the firmware and executing it in the Coldfire simulator, as described in <a href="2010.02.06">part one</a> of this tutorial, yields the following output. The test code can be obtained from <a href="/code/option2.zip">option2.zip</a> (see attachments below).</p> <pre class="language-undefined"></pre> <p><em>Remember to telnet to the above ports if you want to see any output!</em></p> <pre class="language-undefined"></pre> <h2 id="option-three-only-register-with-the-firmware"><a aria-hidden="true" tabindex="-1" href="#option-three-only-register-with-the-firmware"><span class="icon icon-link"></span></a>Option Three: Only Register with the Firmware</h2> <p>This option obviates the use of a shared data structure and may be used in the case where the test code has access to
enough memory to allocate its own data structures. Usually, the constraints on bootloaders and such testers are
relatively low that this is not an option. In this case we only have to share parts of the test data structure and the
specification of the registration interface. The only difference to the previous example is that now the registration
routine takes a pointer to the test structure provided by the test code. In addition only the prefix of the structure
needs to be identical across the two pieces of code. For example the test code may choose to store test results in the
structure that are hidden from the firmware. Let’s look at an example. As follows the specification of the test structure
for the bootloader. <em>Notice the removal of the pinned global variable and the additional value.</em></p> <pre class="language-c"></pre> <p>And here the specification of the test structure for the firmware:</p> <pre class="language-undefined"></pre> <p>This time the test definition structure is allocated by the bootloader and passed in as parameter to the firmware. The
example code is included in <a href="/code/option3.zip">option3.zip</a> (see attachments below). The interaction with the simulator
is identical to the previous example.</p> <h1 id="step-three-dynamic-tests"><a aria-hidden="true" tabindex="-1" href="#step-three-dynamic-tests"><span class="icon icon-link"></span></a>Step Three: Dynamic Tests</h1> <p>In many cases the space constraints for the test code are limited. So flashing an entire precompiled suite of tests may
be impossible or undesirable. In order to overcome this issue you may want to consider dynamic tests. In this scenario
only individual tests are uploaded through the bootloader and executed against the firmware. This approach can be
combined with all of the above methods. In addition to the specified memory sections required by the test procedure
(see Step two) you also need to define a section that holds the dynamic code. In the bootloader this section is
referenced as array to store and replace the code and as function pointer to execute the test. The following example
shows this with an already written array that is stored at the location of the test-code. The example code of the test
is shown as follows:</p> <pre class="language-undefined"></pre> <p>To build the test code, you link it using a script that places the text, data and bss segment at the location of the
test-code; or pin the test function explicitly to the section of the test code of the bootloader. The former option is
useful, when the tests consist of several subroutine calls. The latter is useful for unit tests consisting of a single
function call, having no global data structures. In addition, you might want to consider allocating a separate stack
inside the test routine to avoid corruption.</p> <p>The array containing the test cases can be created from the <code>SREC-S19</code> file of the compiled test-case. The python script <code>srec_to_c.py</code> included in the sample code performs that conversion for continuous S19 files.</p> <h1 id="discussion"><a aria-hidden="true" tabindex="-1" href="#discussion"><span class="icon icon-link"></span></a>Discussion</h1> <p>In this tutorial, we have shown how to leverage the boot-loader-firmware-paradigm introduced in the previous part of
this tutorial to perform dynamic firmware testing. It is up to the software engineer to select the degree to which the
firmware has to interact with the tests to register with the test-suite.</p> <p>In addition to the procedures shown, you may want to consider using your host systems timers to check the progress of
executed tests. If the firmware does not register with the tests properly or a test becomes stalled, the bootloader
can be able to recover itself using a timer interrupt.</p> <p>A substantial risk using these approaches is that the firmware and the bootloader still share the same address space. You
may want to consider introducing explicit checks that ensure that the firmware does not touch bootloader code
(i.e., through heap operations) and vice versa.</p> <p>The srec_to_c.py script performs the transformation of the test-case’s <code>SREC/S19</code> files to the array. You can modify
this script to create binary images that are uploaded through your devices interface.</p> <ul><li><a href="/code/option2.zip">option2.zip</a></li> <li><a href="/code/option3.zip">option3.zip</a></li> <li><a href="/code/dynamic_tests.zip">dynamic_tests.zip</a></li></ul> <hr/> <p><a href="https://survivalengineer.blogspot.com/2010/02/on-designing-boot-loaders-and-grey-box_5529.html" rel="nofollow">Cross posted from my old Blog</a></p>`,1);function _(r){var s=g(),c=o(e(s),10);t(c,()=>`<code class="language-undefined">MEMORY
&#123;
    ram        : ORIGIN = 0x10200000, LENGTH = 1M
&#125;

SECTIONS
&#123;
.text :
    &#123;
    *(.text)
    *(.rodata*)
    &#125; &gt; ram

.data :
    &#123;
    *(.data)
    &#125; &gt; ram

.bss :
    &#123;
    *(.bss)
    &#125; &gt; ram

__TESTS__ 0x10300000:
    &#123;
    *(__TESTS__)
    &#125;
&#125;</code>`,!0),i(c);var l=o(c,4);t(l,()=>`<code class="language-undefined">void __attribute__ ((section (&quot;__TEST_INIT__&quot;))) init_tests() &#123;
...
&#125;</code>`,!0),i(l);var u=o(l,4);t(u,()=>`<code class="language-undefined">Sections:
Idx Name          Size      VMA       LMA       File off  Algn
...
3 __TEST_INIT__ 00000030  10400000  10400000  00006000  2**1
...
Disassembly of section __TEST_INIT__:

10400000 :
...</code>`,!0),i(u);var d=o(u,4);t(d,()=>`<code class="language-c"><span class="token keyword">typedef</span> <span class="token keyword">struct</span> <span class="token punctuation">&#123;</span>
<span class="token keyword">void</span> <span class="token punctuation">(</span><span class="token operator">*</span>test1_fun<span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span> TestFixture<span class="token punctuation">;</span>

TestFixture <span class="token keyword">__attribute__</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token function">section</span><span class="token punctuation">(</span><span class="token string">"__TESTS__"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> tests<span class="token punctuation">;</span></code>`,!0),i(d);var f=o(d,20);t(f,()=>`<code class="language-undefined">MEMORY
&#123;
    sram     : ORIGIN = 0x10200000, LENGTH = 1M
&#125;

__FIRMWARE_ = 0x10100000;

/* firmware&#39;s test registration routine */
__REGISTER_TEST__ = 0x10300000;

SECTIONS
&#123;
...
    /* shared test data goes here */
    __TEST_DATA__ 0x10400000:
    &#123;
    *(__TEST_DATA__)
    &#125;
&#125;</code>`,!0),i(f);var p=o(f,4);t(p,()=>`<code class="language-undefined">MEMORY
&#123;
    sram     : ORIGIN = 0x10100000, LENGTH = 1M
&#125;

SECTIONS
&#123;
...
/* firmware&#39;s test registration routine */
__REGISTER_TEST__ 0x10300000:
    &#123;
    *(__REGISTER_TEST__)
    &#125;

/* shared test data goes here */
__TEST_DATA__ 0x10400000:
    &#123;
    *(__TEST_DATA__)
    &#125;
&#125;</code>`,!0),i(p);var m=o(p,4);t(m,()=>`<code class="language-undefined">typedef struct &#123;
void (*firmware_fun)();
&#125; TestFixture;

TestFixture __attribute__ ((section(&quot;__TEST_DATA__&quot;))) gTestFixture;

extern void __REGISTER_TEST__();</code>`,!0),i(m);var h=o(m,4);t(h,()=>`<code class="language-c"><span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token punctuation">)</span>
<span class="token punctuation">&#123;</span>
    <span class="token function">debug_puts</span><span class="token punctuation">(</span><span class="token string">"Inside boot-loader test suite!&#92;r&#92;n"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">/* register test structure */</span>
    <span class="token function">__REGISTER_TEST__</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">/* execute a firmware function to test */</span>
    gTestFixture<span class="token punctuation">.</span><span class="token function">firmware_fun</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">debug_puts</span><span class="token punctuation">(</span><span class="token string">"Inside boot-loader again!&#92;r&#92;n"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span></code>`,!0),i(h);var _=o(h,4);t(_,()=>`<code class="language-undefined">void  __attribute__ ((section (&quot;__REGISTER_TEST__&quot;))) test_register() &#123;
gTestFixture.firmware_fun = myprimitive;
&#125;</code>`,!0),i(_);var v=o(_,4);t(v,()=>`<code class="language-undefined">Use CTRL-C (SIGINT) to cause autovector interrupt 7 (return to monitor)
Loading memory modules...
Loading board configuration...
  Opened [/usr/local/coldfire/share/coldfire/cjdesign-5307.board]
Board ID: CJDesign
CPU: 5307 (Motorola Coldfire 5307)
  unimplemented instructions: CPUSHL PULSE WDDATA WDEBUG
  69 instructions registered
  building instruction cache... done.
Memory segments: dram  timer0  timer1  uart0(on port 5206)
           uart1(on port 5207)  sim  flash  sram</code>`,!0),i(v);var y=o(v,4);t(y,()=>`<code class="language-undefined">Hard Reset...
Initializing monitor...
Enter &#39;help&#39; for help.
dBug&gt; dl merged.s19
Downloading S-Record...
Done downloading S-Record.
dBug&gt; go 0x10200000
... telnet on uart0
Inside boot-loader test suite!
Inside firmware primitive!
Inside boot-loader again!</code>`,!0),i(y);var b=o(y,6);t(b,()=>`<code class="language-c"><span class="token keyword">typedef</span> <span class="token keyword">struct</span> <span class="token punctuation">&#123;</span>
<span class="token keyword">void</span> <span class="token punctuation">(</span><span class="token operator">*</span>firmware_fun<span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">int</span> someTestingValue<span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span> TestFixture<span class="token punctuation">;</span>

<span class="token keyword">extern</span> <span class="token keyword">void</span> <span class="token function">__REGISTER_TEST__</span><span class="token punctuation">(</span>TestFixture <span class="token operator">*</span>tests<span class="token punctuation">)</span><span class="token punctuation">;</span></code>`,!0),i(b);var x=o(b,4);t(x,()=>`<code class="language-undefined">typedef struct &#123;
void (*firmware_fun)();
&#125; TestFixture;</code>`,!0),i(x);var S=o(x,8);t(S,()=>`<code class="language-undefined">/* dynamically loaded structure */
unsigned char __attribute__ ((section(&quot;__TEST_CODE__&quot;)))code [] = &#123;
...
&#125;;
...
extern int __TEST_CODE__();
extern unsigned char * code;

...

int main(void)
&#123;
  debug_puts(&quot;Inside boot-loader test suite!&#92;r&#92;n&quot;);

  /* perform test from loaded array */
  __TEST_CODE__();

  debug_puts(&quot;Inside boot-loader again!&#92;r&#92;n&quot;);

  return 0;
&#125;</code>`,!0),i(S),a(20),n(r,s)}export{_ as default,s as metadata};
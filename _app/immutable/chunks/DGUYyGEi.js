import{M as e,P as t,pt as n}from"./C5Qr1tWr.js";import"./xihTtKlq.js";import"./DSJ1rPnI.js";import"./DPw4rzvf.js";import"./BrJmRK04.js";import"./WppY4ym1.js";import"./BIw1C4rS.js";import"./DPsrAEoc.js";var r={title:`Embedded Continuous Integration Made Easier`,date:`2023-07-27`,updated:`2025-10-04`,categories:[`coding`,`embedded`],coverImage:`/images/CI-HIL-setup-labelled.jpg`,coverWidth:1500,coverHeight:800,excerpt:`Running in the loop automated tests with GitHub actions`},{title:i,date:a,updated:o,categories:s,coverImage:c,coverWidth:l,coverHeight:u,excerpt:d}=r,f=t(`<p>I often get asked how we test our production firmware. This is a conceptual overview of how this can be done for almost
any complex embedded system without embarking on a very expensive hardware-in-the-loop setup. Some of this work is
grounded in lessons learned in previous research that I did during my tenure at the University of Waterloo as PostDoc
years ago.</p> <p>Embracing Continuous Integration for Complex Embedded Systems is essential in today’s Agile world. It’s universally
agreed upon that CI is crucial for bug-free products. However, automating code with hardware components can pose
challenges. The decision between software-based testing (mock systems) and hardware-in-the-loop approaches becomes
critical. Despite these complexities, the standard benefits persist: improved code quality, faster deployment,
regression testing, and an efficient feedback loop during development.</p> <p>For complex embedded systems, opting for hardware-in-the-loop testing is preferable. It offers a more realistic
approach compared to software-based testing. While setting up the hardware may have initial overhead, it avoids the
need for constant revisions of mock interfaces, which can introduce their own bugs and prove less reliable than the
actual production or pre-production hardware. I have done this for many products currently on the market. This post
provides a blueprint of how this can be done for a complex embedded system, such as our <a href="https://www.labforge.ca/features-bottlenose/" rel="nofollow">Bottlenose camera</a>.</p> <p>If you are a large corporation flush with cash and no considerations for extra overheads, call your <a href="https://www.ni.com/en.html" rel="nofollow">National Instruments</a> representative right now, if you’re more like my company, read on. Setting up a hardware-in-the-loop system shouldn’t be
prohibitively expensive if your control and data interfaces to the real world are limited.</p> <p>The camera has a GigE Vision interface and various client utilities (see <a href="https://github.com/labforge/sdk-demos" rel="nofollow">GitHub</a>)
that run in Windows and Linux to support the camera. Our CI, shown in the above picture comprises</p> <ol><li>Security Token to sign production software targeted for Microsoft operating systems</li> <li>The machine that tests the Microsoft platform targeted code</li> <li>A router managing concurrent access to the Entity-under-Test (EuT)</li> <li>The EuT: An open-frame Bottlenose Stereo assembly with a heatsink</li> <li>A debugger to directly flash production and test firmware</li> <li>A power control module.</li> <li>The machine that tests Linux-targeted code and does control all aspects of the CI</li></ol> <p>The significant enabler for having a local CI is GitHub. They permit local runners that can run as services or full
console sessions on almost any platform that supports an operating system. GitHub has a comprehensive set of <a href="https://docs.github.com/en/actions/concepts/runners/self-hosted-runners" rel="nofollow">documentation to guide</a> you to set one up. The idea is to script deployment, test, and execution in a manner that
could work from a Linux console or Windows desktop session. Machines (2) and (7) have each a runner. You can set up
the GitHub CI job dependencies in a way that the jobs are sequenced to allow for interaction between the EuT, Windows
tests, and Linux tests.</p> <p>The debugger (5) would be optional for hard-pressed companies that just want to execute pass-fail tests. However, since
some elements only show on the CI, the system is set up in a manner that one could debug CI failures directly on the CI.
Furthermore, most SoCs and microcontrollers have a device-firmware-update mode (DFU) that allows software deployment
without a debugger. Further, if you use an ARM-based microcontroller or another architecture that supports [Semi-Hosting](<a href="https://developer.arm.com/documentation/dui0471/g/Bgbjjgij" rel="nofollow">https://developer.arm.com/documentation/dui0471/g/Bgbjjgij</a>,
this could be your instrumentation interface for test orchestration as well. If you use a legacy platform or something
that has no mature Semi-hosting interface yet (for example the <a href="https://wch-ic.com/" rel="nofollow">RISCV series by WCH</a>), use a debugger such as <a href="https://www.wch-ic.com/products/WCH-Link.html" rel="nofollow">WCH-Link</a> or <a href="https://www.tincantools.com/product/flyswatter2/" rel="nofollow">Flyswatter2</a> that has an extra UART/RS232 interface. That interface can be used for unit-test instrumentation, you can
directly integrate instrumentation points for the UART into your debugger footprint. This is shown in my <a href="2023.04.30">reaction trainer prototype</a>.</p> <p>The module (6) provides power-stepping to the EuT. This is needed to frame the start and stop between different test
phases and to recover a bad CI job. This module can be expanded with power-measuring capabilities for your application.</p> <p>All CI machines and the EuT are on the same isolated physical network that is controlled by (3). Further to integrate
the test machines with GitHub the machines use Wi-Fi to fetch the CI jobs from GitHub via the corporate Wi-Fi network.</p> <p>We target all our executables to conform to Microsofts <a href="https://en.wikipedia.org/wiki/Extended_Validation_Certificate" rel="nofollow">Extended Validation (EV)</a>. Most solutions that enable this require
a physical access token in the form of a USB stick. Further complicating code-signing is the agent software and token
reader that is specific to your brand of tokens. To avoid unauthorized access, some vendors prevent you from using the
Microsoft <a href="https://learn.microsoft.com/en-us/windows/win32/seccrypto/signtool" rel="nofollow">Sign tool</a> if you are not on a desktop session. That forced us to set up the Windows CI machine (7) in Kiosk
mode. Further, if the CI machine ever needs to be debugged via a remote session it is paramount to reboot it after, such
that the desktop session is restored. GitHub actions permit you to store secret keys as <a href="https://docs.github.com/en/actions/security-guides/encrypted-secrets" rel="nofollow">Action Secrets</a> on an organizational
or repository level, such that these never end up in code.</p> <p>In terms of software, the entire orchestration is done in Python. For bare-metal firmware-based tests, we use <a href="https://www.throwtheswitch.org/unity" rel="nofollow">Unity</a>,
for C++ on an operating system we use <a href="https://mesonbuild.com/" rel="nofollow">meson test</a> with <a href="https://github.com/google/googletest" rel="nofollow">GoogleTest</a>, and for Python <a href="https://docs.python.org/3/library/unittest.html" rel="nofollow">unittest</a>. All bare-metal and bootstrap
code is instrumented via <a href="https://openocd.org/" rel="nofollow">OpenOCD scripts</a>. For ARM microcontrollers for example a Cortex-R4 bootstrap processor we have
in our SoC, OpenOCD provides an excellent interface to use Semi-Hosting as for test instrumentation.</p> <p>The Buts: “This is all nice and cute, but I have more serious issues, like…”</p> <ul><li>“But I have to simulate physical thing X”: The first question to ask yourself. Are you testing something like printf?
Is there an actual value to simulate property X as opposed to mocking it from the debug interface (as discussed above)?
If not read on …</li> <li>“But I have analog interfaces on my EuT”: Look into emulating these from a low-cost platform. For example,
the power-control module in my setup could be replaced by an Arduino with a DAC that drives your analog interfaces.</li> <li>“But my analog interfaces measure physical properties directly”: Can you cheaply simulate the physical properties?
Could you desolder your analog sensor and drive the analog sensor output from an Arduino? For an inertial measurement unit,
can you build a fixture out of <a href="https://vention.io/" rel="nofollow">industrial automation equipment</a> to test (see here for ideas)?
For Image sensors, can you build fixtures at the focal range to detect (<a href="https://www.imatest.com/" rel="nofollow">see here for example</a>)?</li> <li>“But I have RF interfaces that need testing”: Simulate another endpoint from the computer attached to your EuT.
Can you simulate your RF protocol from a low-cost <a href="https://greatscottgadgets.com/sdr/" rel="nofollow">SDR</a>?
Can you implement non-PC-supported interfaces from a purpose-built embedded module? If your EuT is the only endpoint
in your building for that protocol shielding may not be a concern. If it is a concern, you could look into building
our own mini test-chamber, a good application note for this can be found <a href="https://www.ti.com/lit/an/swra468/swra468.pdf" rel="nofollow">here</a>. <a href="https://theemcshop.com/benchtop-faraday-tents/rft-03t-mobile-benchtop-rf-shielded-tent/" rel="nofollow">Commercial solutions</a> for
these are also widely available or could be rented for the duration of the project.</li> <li>“But running my test poses a safety hazard for human life:” Again, back to the first point. If that is still not an
option, can you safety your test environment in a cage with light curtains and other human lockout measures? I
actually was in that boat. We did work on drone autopilots for a big <a href="https://dronedeliverycanada.com/" rel="nofollow">Canadian company</a>. The EuT was a 100lbs
heavy-lift drone. We actually build a cage with lockouts and secured the drone on a ball joint. However, these tests
followed a manual script and didn’t make it into an automated continuous integration. The other big issue about such
kinds of tests is EuT wear. While you might neglect or write off lower-cost EuTs due to issues like flash-endurance
on a EuT replacement schedule, something like drones or welding robots might not be suited for all-in automated
integration tests, which brings us back to the first point.</li> <li>“But my device requires a human test subject in the loop:” Again going back to the first point. If that is not an
option, you are likely doing something wrong. For medical devices, you are likely on a waterfall or V-shaped
development process with set acceptance test gates. Human trials will be mandated at later stages and should not be
considered at this stage. Joking, if that is not an option, haze your new hires. We did some work for a company that
builds conductive energy weapons (your guess is likely right) years ago. In casual talks with some staff members, they said
it was part of their interview question. (Paraphrasing, so that corporate hints are left out): “Would you like to have
the EuT tested on you?”. Most folks allegedly answered yes. The best answer I got was from a marketing chap.
“Yes, after you pay me.” I kid you not, the story is that the CEO was waiting to sign their first paycheck.
“I’m coming…”. Our work involved cameras, I later heard that the camera division was consolidated into a different
unit from the “EuT” folks, my guess is, it was probably for talent acquisition reasons. But seriously, back to point
one, there are probably documented procedures on the physical properties of a human test subject without an actual
test subject in the loop.</li> <li>“But my ‘but’ is not covered”: Connect with me on the social links below. I might have some ideas.</li></ul> <p>This is a brief conceptual run-down of how a hardware-in-the-loop system can be set up without embarking on a
significant instrumentation investment. Further by using local runners, you can allow for long-running complex CI
pipelines without ever overrunning your GitHub minutes budget. If you have multiple product lines you can scale this
setup as shown in a paper I <a href="https://uwaterloo.ca/embedded-software-group/references/datamill-rigorous-performance-evaluation-made-easy" rel="nofollow">published a few years ago</a>.
The source code from our CI is omitted to protect trade secrets. If you need help with your test setup, drop me a line.
I’m open to consulting inquiries.</p>`,1);function p(t){var r=f();n(28),e(t,r)}export{p as default,r as metadata};
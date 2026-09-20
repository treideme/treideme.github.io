import{$ as e,E as t,M as n,P as r,mt as i,pt as a,tt as o}from"./C5Qr1tWr.js";import"./xihTtKlq.js";import"./DSJ1rPnI.js";import{t as s}from"./DPw4rzvf.js";import"./BrJmRK04.js";import"./WppY4ym1.js";import"./BIw1C4rS.js";import"./DPsrAEoc.js";var c={title:`90s Offline Linux Possible Today ?`,date:`2022-07-18`,updated:`2025-10-04`,categories:[`covid-19`,`coding`],coverImage:`/images/suse53.jpg`,coverWidth:350,coverHeight:350,excerpt:`Can Linux be fully installed from optical media today?`},{title:l,date:u,updated:d,categories:f,coverImage:p,coverWidth:m,coverHeight:h,excerpt:g}=c,_=r(`<p><a href="https://github.com/treideme/offline-ubuntu" rel="nofollow">All sources, tools, and code are available here</a></p> <p>Friday two weeks ago was almost a forced corporate holiday. A <a href="https://www.ctvnews.ca/business/crtc-requests-detailed-explanation-about-service-outage-in-letter-to-rogers-1.5984540" rel="nofollow">massive outage of Rogers</a> caused mayhem in Canada.
Everything from selective 911 outages, and payment settlement systems, to a complete loss of cellular service in all
Rogers-serviced cells to Internet outages. Years of festering complacency of government watchdogs, like the <a href="https://crtc.gc.ca/eng/home-accueil.htm" rel="nofollow">CRTC</a>, and
the lack of competition in the telecom sector were likely contributing factors to the outage. As a business or
individual, you take these things for granted. In many cases, like in my business, cellular systems are used as a
backup for the rare occasion of a data outage, which kind of turn out to be useless if they feed into the same failed
infrastructure.</p> <!> <p>For a long time, I have been a fan of optical backups, particularly for long-term archival storage like <a href="https://en.wikipedia.org/wiki/M-DISC" rel="nofollow">M-Disc</a>. With the
increase in data densities, I went from DVD to Blu-ray, and most recently 4-layer BDXL. While 100GB seems low in
comparison to other backup media types, the promise of <a href="https://www.businesswire.com/news/home/20150203005805/en/Archive-for-Enterprise-as-Millenniata-Inc.-and-Mitsubishi-Kagaku-Media-deliver-an-MDISC%E2%84%A2-100GB-Blu-ray%E2%84%A2-optical-Media-for-life-time-archival" rel="nofollow">1000-year data retention</a>, and the fact that external Blu-ray
drives consume little power compared to a full-blown NAS rack, means that these could be considered viable media even
in the face of a sustained power outage. You can run a laptop with a Blu-ray drive attached on a 60W solar panel or
battery-backup source for days. If you own an old DJ case for 500 CDs or so, this also makes a brilliant container for
indexing backups. While Mitsubishi Kagu Media (a.k.a. Verbatim) and many <a href="https://www.canada.ca/en/conservation-institute/services/conservation-preservation-publications/canadian-conservation-institute-notes/longevity-recordable-cds-dvds.html" rel="nofollow">government testers</a> advise against sleeves for
long-term archival, some boxes like these come with soft-cloth-backed sleeves that do not scratch or stick to the
optical media side, as long as you stay away from humid or damp environments. 400+ sleeves yield about 40TB. Since
Blu-ray is nonmetallic, the data might even survive a NEMP attack or extensive solar storm. Since optical media seems
to fall out of fashion, for easy access you can pack a slimline Blu-Ray rewriter in the same box.</p> <p>This brings back memories of the 90s. I have my first vivid memories of converting from MS-DOS and various Windows
versions to <a href="https://www.suse.com/" rel="nofollow">SuSE Linux</a> in the late 90s. You would get half a meter of manuals and a binder of 5 or more CDs after
paying a <a href="https://www.macwelt.de/news/SuSE-Linux-7-3-fuer-PowerPC-2773027.html" rel="nofollow">sizable</a> (or as a high-schooler not so sizable) amount to install. Those CDs had everything to bootstrap any
box at the time to a decent Linux system. The option to add remote mirrors via FTP was an extra feature and not the
requirement you have today. I survived from the early to the late 90s mainly on a 14.4KBaud dial-up modem, and later a
128KBaud ISDN modem. So any extensive downloads were a risky and expensive proposition since you paid initially overland
phone rates to connect to the handful of ISP providers that existed at the time in Germany, and you could get interrupted
at any time by the family’s need to make phone calls from the same phone line. To get an idea of the bandwidth, if you
were curious enough to have found the adult section on some shady IRC server at the time.
Streaming video was impossible over dial-up or ISDN.</p> <p>You had to wait minutes in excitement to just download one SVGA-sized picture of your favourite scantly-clad model
(in 1993 I think I fell for <a href="https://en.wikipedia.org/wiki/Cindy_Crawford" rel="nofollow">Cindy Crawford</a>). Let’s illustrate what this looks like…</p> <!> <p>Most tools, projects, “other applications”, and “private collections” made the rounds on <a href="https://en.wikipedia.org/wiki/Floppy_disk" rel="nofollow">3.5″ floppies</a> or for a brief
period on <a href="https://en.wikipedia.org/wiki/Zip_drive" rel="nofollow">Iomega ZIP</a> disks. Only a few kids could save up their allowance to buy CD writers. Those that did, found ways
to recoup their investment by offering under-the-hand CD copy services. Data exchange back then required real social
skills, unlike today.</p> <p>Way back Ubuntu used to ship in this form too, and still to this day supports adding <a href="https://help.ubuntu.com/community/AptCdrom" rel="nofollow">external media</a> as an apt source.
So it got me thinking if you could not just mirror every package Ubuntu has to offer and create optical media. In fact,
going through blogs you can find references all the way up to <a href="https://www.zyxware.com/articles/2657/how-to-mirror-the-entire-ubuntu-software-repository-locally-and-to-create-your-own" rel="nofollow">Ubuntu 12</a>. I tried and succeeded to get some of those
tools ported <a href="https://github.com/treideme/offline-ubuntu" rel="nofollow">forward to Ubuntu 18.04</a>, which I currently use at home and in the office these days. Here is what you need</p> <ul><li>A working recent Ubuntu Linux machine.</li> <li>About 500 GB of storage.</li> <li><a href="https://manpages.ubuntu.com/manpages/questing/en/man1/apt-mirror.1.html" rel="nofollow">apt-mirror</a></li> <li>debpartial utilities (adapted <a href="https://github.com/treideme/offline-ubuntu" rel="nofollow">here</a> for a more modern Ruby version)</li></ul> <pre class="language-bash"></pre> <p>The configuration of <code>/etc/apt/mirror.list</code> really depends on your architecture and the apt sources you want to mirror. A
good starting point is to look at your <code>/etc/apt/sources.list&#123;.d&#125;</code> on a system that is representative of what you want to
mirror. You also have to set the <code>base_path</code> to where the mirror is saved at. Example for <code>/etc/apt/mirror.list</code>:</p> <pre class="language-bash"></pre> <p>Now with the media in hand, you can use synaptic or <a href="https://help.ubuntu.com/community/AptCdrom" rel="nofollow">apt-cdrom</a> to add them as a package mirror.</p> <!> <p>I have been doing the same evaluation for development tools; a <a href="https://xilinx-wiki.atlassian.net/wiki/spaces/A/pages/60129817/Xilinx+Yocto+Builds+without+an+Internet+Connection" rel="nofollow">Yocto-based Linux SDK</a> in particular, local <a href="https://docs.github.com/en/repositories/creating-and-managing-repositories/duplicating-a-repository" rel="nofollow">git mirrors</a>, and
and selective <a href="https://stackoverflow.com/questions/50348248/creating-a-full-replica-offline-copy-of-the-public-pypi-repository" rel="nofollow">PyPi mirroring</a>. I am working on a similar offline install for Windows 10 and Microsoft Visual Studio (or
at least all required command line build tools), but have not succeeded in getting all the required packages in offline
form, the look-and-feel of the <a href="https://www.catalog.update.microsoft.com/Home.aspx" rel="nofollow">Microsoft Update Catalog</a> seems designed to discourage this endeavour. Some tools that
would require online activation at installation are also an issue. Luckily some vendors like JetBrains still permit <a href="https://www.jetbrains.com/help/clion/working-offline.html#code-inspections" rel="nofollow">code-based installations</a> for complete island systems, that are typically found in sensitive or defence-related settings.</p>`,1);function v(r){var c=_(),l=o(e(c),4);s(l,{src:`/images/djcase_for_backups.jpg`,alt:`DJ Case for Backups`,width:`500`});var u=o(l,8);s(u,{src:`/images/cindy_animated-1.gif`,alt:`Cindy Crawford 1993`,width:`400`});var d=o(u,8);t(d,()=>`<code class="language-bash"><span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> apt-mirror ruby
<span class="token comment"># Now adapt your mirror list (see below)</span>
<span class="token function">sudo</span> <span class="token function">vi</span> /etc/apt/mirror.list
<span class="token function">sudo</span> apt-mirror
<span class="token comment"># Pick a directory where to stage symlinks for the BDXL split</span>
<span class="token function">sudo</span> <span class="token function">mkdir</span> <span class="token operator">&lt;</span>bdxl_dir<span class="token operator">></span>
./debpartial.rb <span class="token parameter variable">--nosource</span> <span class="token parameter variable">--size</span> <span class="token number">98000000000</span> <span class="token punctuation">&#92;</span>
   <span class="token parameter variable">--section</span><span class="token operator">=</span>main,restricted,universe,multiverse <span class="token punctuation">&#92;</span>
   <span class="token parameter variable">--arch</span><span class="token operator">=</span>amd64 <span class="token punctuation">&#92;</span>
   <span class="token parameter variable">--dist</span><span class="token operator">=</span>bionic,bionic-security,bionic-updates,bionic-proposed,bionic-backports <span class="token punctuation">&#92;</span>
  <span class="token operator">&lt;</span>mirror_dir<span class="token operator">></span>/archive.ubuntu.com/ubuntu/ <span class="token punctuation">&#92;</span>
  <span class="token operator">&lt;</span>bdxl_dir<span class="token operator">></span>
<span class="token comment"># create symlinks for the created indexes</span>
./debcopy.rb <span class="token parameter variable">-l</span> <span class="token operator">&lt;</span>mirror_dir<span class="token operator">></span>/archive.ubuntu.com/ubuntu/ <span class="token operator">&lt;</span>bdxl_dir<span class="token operator">></span>/Debian<span class="token operator">&lt;</span>i<span class="token operator">></span>/
<span class="token comment"># now symlinks for 98GiB partitions are stored in &lt;bdxl_dir>/Debian&lt;XXX></span>
<span class="token comment"># create isos following the symlinks as follows</span>
<span class="token function">sudo</span> <span class="token function">mkisofs</span> -joliet-long <span class="token parameter variable">-f</span> <span class="token parameter variable">-J</span> <span class="token parameter variable">-r</span> <span class="token parameter variable">-V</span> <span class="token string">"Ubuntu 18.04 &lt;i>/3"</span> <span class="token parameter variable">-o</span> ubuntu-18.04-<span class="token variable"><span class="token variable">$(</span><span class="token function">date</span> <span class="token parameter variable">-I</span><span class="token variable">)</span></span>-complete-amd64-bdxl<span class="token operator">&lt;</span>i<span class="token operator">></span>.iso dvds/Debian<span class="token operator">&lt;</span>i<span class="token operator">></span>/
<span class="token comment"># These isos can then be burned via your favourite program to a BDXL media</span></code>`,!0),i(d);var f=o(d,4);t(f,()=>`<code class="language-bash"><span class="token comment">############# config ##################</span>
<span class="token comment">#</span>
<span class="token builtin class-name">set</span> base_path     <span class="token operator">&lt;</span>mirror_dir<span class="token operator">></span>
<span class="token comment">#</span>
<span class="token comment"># set mirror_path  $base_path/mirror</span>
<span class="token comment"># set skel_path    $base_path/skel</span>
<span class="token comment"># set var_path     $base_path/var</span>
<span class="token comment"># set cleanscript $var_path/clean.sh</span>
<span class="token comment"># set defaultarch  &amp;lt;running host architecture></span>
<span class="token comment"># set postmirror_script $var_path/postmirror.sh</span>
<span class="token comment"># set run_postmirror 0</span>
<span class="token builtin class-name">set</span> nthreads     <span class="token number">20</span>
<span class="token builtin class-name">set</span> _tilde <span class="token number">0</span>
<span class="token comment">#</span>
<span class="token comment">############# end config ##############</span>
 
deb http://archive.ubuntu.com/ubuntu bionic main restricted universe multiverse
deb http://archive.ubuntu.com/ubuntu bionic-security main restricted universe multiverse
deb http://archive.ubuntu.com/ubuntu bionic-updates main restricted universe multiverse
deb http://archive.ubuntu.com/ubuntu bionic-proposed main restricted universe multiverse
deb http://archive.ubuntu.com/ubuntu bionic-backports main restricted universe multiverse</code>`,!0),i(f);var p=o(f,4);s(p,{src:`/images/synaptics_add_cdr.png`,alt:`Synaptic Add CD-ROM`,width:`500`}),a(2),n(r,c)}export{v as default,c as metadata};
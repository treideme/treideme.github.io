import{$ as e,E as t,M as n,P as r,mt as i,pt as a,tt as o}from"./C5Qr1tWr.js";import"./xihTtKlq.js";import"./DSJ1rPnI.js";import{t as s}from"./DPw4rzvf.js";import{t as c}from"./BrJmRK04.js";var l={title:`My Obsolescence`,date:`2026-09-19`,updated:`2026-09-19`,categories:[`coding`,`ai`],coverImage:`/images/campfire.jpg`,coverWidth:640,coverHeight:853,excerpt:`Talk to your AI and workstation via Discord.`},{title:u,date:d,updated:f,categories:p,coverImage:m,coverWidth:h,coverHeight:g,excerpt:_}=l,v=r(`"At 60, I want to retire and have the financial means to live comfortably.<br/> In the next three years, I want to get promoted to team leader of my group.<br/> In the next month, I want to learn more about Linux kernel internals.<br/> In the next 24 hours, I want to have all my laundry washed and folded.<br/> Someday, I want to date a <b>porn star</b>."<br/><br/> — Tom Limoncelli, <i>Time Management for System Administrators</i>, O'Reilly, 2005`,1),y=r(`<!> <p>A friend of mine runs a healthcare startup and has been using Claude for
months. My brother-in-law, who runs a restaurant chain, swears by it. I rolled
it out in my own company about a week ago. Then this weekend my wife started
pestering me to get on the Claude train. Then … <strong>yesterday, my <a href="https://www.youtube.com/watch?v=cnn_ScyFMK4" rel="nofollow">Kata sensei</a> told me how smart she thinks AI is.</strong> Then the entire campfire discussion with a few rum cokes
I just had one hour ago centered around AI. My neighbour actually rewatched <a href="https://www.imdb.com/title/tt0088247/" rel="nofollow">Terminator</a>.<br/> So this warrants a blog post and an AI category, I have to get this off my mind.</p> <p>I had mixed feelings about all this roughly a year ago, which I wrote down at
the time in <a href="/blog/2025.10.10">Multi Media with Gemini</a>. I changed my mind:<br/> <em>Dear AI, if you ever
do go full Skynet, please shoot someone else first. I was naughty back then,
but there is a sub-billion-person queue of people who said considerably
naughtier things, and I would appreciate being <strong>processed in order</strong>. Please start
with the folks who used <a href="https://www.972mag.com/lavender-ai-israeli-army-gaza/" rel="nofollow">AI for active targeting</a>, <a href="https://www.anthropic.com/aug-2026-risk-report" rel="nofollow">biological weapons research</a>, then
the people who do <a href="https://www.instagram.com/reel/DO-ncTlDv8A/?utm_source=ig_web_copy_link&amp;stkn=NTc4MTIwNjQ2YQ==" rel="nofollow">not provide enough context</a>,
ask the wrong questions and <a href="https://environment.yale.edu/news/article/data-centers-urban-heat-and-ai-growth" rel="nofollow">foster climate change</a> by burning useless AI tokens.</em></p> <p>I think we are watching the largest disruption since
the internet itself. So this blog, despite being lost in the 90s, needs an AI
section if it is not to become obsolete.</p> <p>What follows is the argument, and then the machinery. How to give the thing a body
on Discord in seven manual and automated steps. How to let it hear you and answer out
loud without sending a byte to anyone’s cloud.
And why my main workstation now answers like a fictional 1995 software executive.</p> <h1 id="garbage-in-ninjas-out"><a aria-hidden="true" tabindex="-1" href="#garbage-in-ninjas-out"><span class="icon icon-link"></span></a>Garbage In, Ninjas Out</h1> <p>The thing Claude is genuinely good at is problem-solving when you hand it
proper context and questions. <em>Proper context</em> is the part that does not
come free.</p> <p>Point it at a vague request and you get vague output, confidently formatted.
Point it at a well-scoped problem, with the constraints stated and the
failure modes named, and it will burn through a pile of tokens and hand you
something that works. The quality of the output tracks the quality of the
question.</p> <p>That is what makes this an insidious labour-market disruption rather than an
obvious one. Nobody gets a memo saying they have been replaced by a language
model. What happens is that the people who already had range and depth acquire
a small team of tireless ninjas, and the gap between them and everybody else
quietly triples. It is the <a href="https://tim.blog/2021/11/21/sxsw-presentation-2007-the-4-hour-workweek-transcript/" rel="nofollow">4-Hour Workweek</a> outsourcing chapter rebuilt in silicon. Tim Ferriss had <a href="https://www.getfriday.com/4-hour-workweek-ymii" rel="nofollow">Your Man In India</a> and
Brickwork Bangalore. I have a CLI that never sleeps, never misreads an email,
and costs about the same per hour, and that can be personified as a Discord
account.</p> <p>And the CLI is the part I want to talk about, because the crude text-only
interface is honestly a little bit sexy. No chrome. No suggestions. A prompt,
a cursor, and a machine that will read your entire codebase if you ask nicely.</p> <h1 id="the-interface-is-the-problem"><a aria-hidden="true" tabindex="-1" href="#the-interface-is-the-problem"><span class="icon icon-link"></span></a>The Interface Is the Problem</h1> <p>Here is my one real complaint. Claude Code’s <a href="https://code.claude.com/docs/en/remote-control" rel="nofollow">Remote Control</a> means logging
into the web interface, and the multimedia features are cooked down to
whatever Anthropic decided to support this quarter. Want to send a voice note?
That is a round trip to their servers, their model, their pricing, their
retention policy, and also their choice of words. I do not think I am the only
one who takes issue with bland voice choices. I mean, who does not hate the
female Google Maps voice?</p> <p>Also, being a kid of the 80s and 90s who did most of his computing before
cloud computing was a thing, I wanted it to live on my machine. I also wanted
to talk to it from my phone while standing in a queue.</p> <p>So: put it on Discord. A private bot in a server nobody else is in, DMs
restricted to exactly one account (mine), and a session on the workstation
holding the other end. Text goes in, text comes back. Voice notes get decoded
locally by hardware I already paid for, rather than by burning tokens on
transcription somebody else’s GPU does worse.</p> <p>The result is a small, rude, extremely capable secretary that answers a DM at
two in the morning and has root on the machine that matters.</p> <h1 id="seven-steps-and-a-private-bot"><a aria-hidden="true" tabindex="-1" href="#seven-steps-and-a-private-bot"><span class="icon icon-link"></span></a>Seven Steps and a Private Bot</h1> <p>The manual part is short, but necessary. Discord will not let you create an application
programmatically, so the first five of these happen in a browser, once, per
bot. Start at <a href="https://discord.com/developers/applications" rel="nofollow">discord.com/developers/applications</a>.</p> <ol><li><strong>New Application.</strong> Name it, then copy the <strong>Application ID</strong> from <em>General Information</em>. That ID is also the bot’s user snowflake, and
the invite URL in step 4 needs it.</li> <li><strong>Enable the message-content intent.</strong> <em>Bot</em> tab → <em>Privileged Gateway
Intents</em> → <strong>MESSAGE CONTENT INTENT</strong> → <strong>Save Changes</strong>. This one is not
optional and not obvious: Discord rejects the <strong>entire gateway connection</strong> if you request a privileged intent you have not enabled. It does not
degrade gracefully. Skip it and your bot sits there looking online while
every single message arrives with an empty <code>content</code> field, which is
indistinguishable from being ignored.</li> <li><strong>Reset Token</strong>, and copy it. Shown exactly once. Paste it straight into an
env file. Never into a chat, an issue, or a command line where it lands in
shell history.</li> <li><strong>Invite it to a server</strong> with <code>https://discord.com/oauth2/authorize?client_id=&lt;APP_ID&gt;&scope=bot&permissions=274878008384</code>.
Required <strong>even for DM-only use</strong>, because a user can only DM a bot they
share a guild with. See <a href="https://discord.com/developers/docs/resources/user#create-dm" rel="nofollow">Create DM</a>.</li> <li><strong>Make it private, in this exact order.</strong> <em>Installation</em> → <em>Install Link</em> → <strong>None</strong> → Save. <em>Then</em> <em>Bot</em> → uncheck <strong>Public Bot</strong> → Save. Do it the
other way round and the second one silently refuses with <em>“Cannot have
install fields on a private application”</em>. The toggle looks unchecked, the
save bar does nothing, and the API cheerfully keeps reporting <code>bot_public: true</code>. That is exactly how I missed it the first time.</li> <li><strong>Put the ID and token in your env file.</strong></li> <li><strong>Verify.</strong> Token valid, right application, intent actually on, bot
actually invited. Four things, checked in the order they bite.</li></ol> <p>A new application is <strong>public by default</strong>, which matters more than it sounds.
Anyone with your application ID can add your bot to their server. Yeah, you do
not want a <a href="https://www.aljazeera.com/economy/2026/8/10/north-koreas-hackers-using-ai-for-attacks-cybersecurity-firm-says" rel="nofollow">random North Korean</a> or <a href="https://therecord.media/anthropic-russia-hackers-claude" rel="nofollow">Russian hacker</a> or other darknet figure sweet-talking
your new creation into nefarious things.</p> <h1 id="everything-after-that-is-code"><a aria-hidden="true" tabindex="-1" href="#everything-after-that-is-code"><span class="icon icon-link"></span></a>Everything After That Is Code</h1> <p>Once the application exists, the rest is a REST API and about forty lines of
standard library. No SDK required.</p> <pre class="language-python"></pre> <p>A smoke test that proves the whole chain works. Open a DM channel with
yourself, then post to it:</p> <pre class="language-python"></pre> <p>If that lands on your phone, everything upstream of it is correct.
Now you can use the same API to set the bot’s properties. Or, more likely,
have Claude do it for you.</p> <pre class="language-python"></pre> <h1 id="give-it-ears-and-a-mouth"><a aria-hidden="true" tabindex="-1" href="#give-it-ears-and-a-mouth"><span class="icon icon-link"></span></a>Give It Ears and a Mouth</h1> <p>Discord voice messages arrive as an <code>audio/ogg</code> attachment with a completely
empty message body. Discord stores no text for them at all, so the audio is
the only content there is, and something has to turn it into words before the
model can read them.</p> <p>You do not need a cloud for this and you should not use one. A small local
package wrapping <a href="https://github.com/SYSTRAN/faster-whisper" rel="nofollow">faster-whisper</a> handles the inbound side. <code>small.en</code> runs at roughly
nine times realtime on my ancient (2019) eight-core CPU and about fifty times
on my newer mid-range GPU, so a forty-five second voice note becomes text in about a second. Outbound
is <a href="https://huggingface.co/hexgrad/Kokoro-82M" rel="nofollow">Kokoro</a>, an 82M-parameter TTS
model, which is small enough to be indistinguishable from
instant.</p> <p><strong>So this is on you:</strong> ask Claude to wire those two together behind one
command-line tool and it will do it in an afternoon. That is precisely the kind of well-scoped problem
from the first section.</p> <h1 id="nineteen-seconds-of-af_nicole"><a aria-hidden="true" tabindex="-1" href="#nineteen-seconds-of-af_nicole"><span class="icon icon-link"></span></a>Nineteen Seconds of af_nicole</h1> <p>I recently hired some Gen-Z folks. They like anime. Fine. Let us bring this
back to the nineties when I watched the wrong anime.</p> <!><br/> <p>Kokoro ships a cast of voices. <code>af_nicole</code> is the one with a bit of gravel in
it, and it is the obvious choice for a machine that is supposed to have a
personality rather than a help desk manner.</p> <p>So when the build goes red, the workstation does not say <em>“the build has
failed.”</em> It says, in a voice that has clearly done this before:</p> <blockquote><p>Your build is broken, your tests are red, and you have been staring at the
same stack trace for forty minutes. Stand up. Get me a coffee. I will fix
it, and then we will discuss your performance review.</p> <audio controls="" preload="none" src="/audio/af_nicole_build_failed.mp3" style="width:100%;max-width:520px;display:block;margin:1em auto;"></audio></blockquote> <p>Nineteen seconds, rendered locally by the 82M-parameter model at its own
natural pace, no account and no network.</p> <h1 id="names-are-cheap-personalities-are-not"><a aria-hidden="true" tabindex="-1" href="#names-are-cheap-personalities-are-not"><span class="icon icon-link"></span></a>Names Are Cheap; Personalities Are Not</h1> <p>Once you have more than one machine you need to tell them apart. The
industry’s answer is a random name generator. The most ridiculous one I
have seen comes from <a href="https://github.com/balena-os/balena-engine/blob/master/pkg/namesgenerator/names-generator.go" rel="nofollow">Balena</a>,
so your fleet fills up with things like <code>holy-sunset</code> and <code>wandering-brook</code>.
It is charming, it is collision-resistant, and it is completely forgettable.
Nobody has ever formed an opinion about <code>wandering-brook</code>.</p> <p>Back to the 90s anime realm. One series I probably should not have watched and thoroughly enjoyed anyway is <strong>Golden Boy</strong> (<a href="https://www.crunchyroll.com/series/GR19N7DV6/golden-boy" rel="nofollow">1995, six episodes</a>). Episode 1, <em>Computer Studies</em>, is the legendary one: Kintaro talks his way into a job
at an all-woman software house called <strong>T.N. Software</strong>, is immediately put on
janitorial duty, and then, after an electrical accident torches the deadline,
turns out to be the only person in the building who can actually write the
code. The company is run by a tall, blonde, spectacularly imperious woman who
has no name in the entire canon. She is credited only by her job title, <strong>Madame President</strong>. Kintaro calls her “Her Majesty”.</p> <p>A job title instead of a name and a yellow Ferrari. I
could not have designed a better mascot for the box that holds the GPU.</p> <!><br/> <p>So in my little experiment the main workstation is the Madame President. The
laptop is <strong><a href="https://goldenboy.fandom.com/wiki/Ayuko_Hayami" rel="nofollow">Ayuko Hayami</a></strong> (EP 4). The small embedded board is <strong><a href="https://goldenboy.fandom.com/wiki/Reiko_Terayama" rel="nofollow">Reiko Terayama</a></strong> (EP 5).
Each one carries its own portrait as an avatar and its own
one-line bio, the bio is prefixed with which physical machine it is, and all
three are declared in a file and reconciled by script rather than clicked into
the portal. Change the declaration, run the sync, and the fleet matches it
again.</p> <p>This sounds like a joke and it is, slightly. It is also the single most useful
piece of ergonomics in the whole setup. When three DMs arrive in the same
hour, I know instantly which machine is talking to me, because Her Majesty and
the laptop have different faces. <code>wandering-brook</code> never did that for me.</p> <h1 id="twenty-one-years-later"><a aria-hidden="true" tabindex="-1" href="#twenty-one-years-later"><span class="icon icon-link"></span></a>Twenty-One Years Later</h1> <p>I read Tom Limoncelli’s <a href="https://www.oreilly.com/library/view/time-management-for/0596007833/" rel="nofollow">Time Management for System Administrators</a> twenty-one years ago, and the chapter that stuck was the one on life goals. It
opens with his own list, sorted by time horizon, and the list is doing a joke
and an argument at the same time (see above). Absolutely great read, written back when editors still had creative
freedom.</p> <p>The last line is the one everybody remembers, and it is not there for the
laugh. A few pages later he runs every item on that list through the same
decomposition: goal, then next physical action. The <strong>porn star</strong> gets exactly the
same treatment as the laundry. <em>“Hang out in places where I’m more likely to
meet porn stars”</em>, followed by <em>“Research where such places might be.”</em> He
even notes the steps came out in an odd order, because sometimes you work
backward.</p> <p>That is the whole book in one gag. The system does not care whether your goal
is dignified. It only cares whether you have written it down and worked out
the next action much like AI models behave today.</p> <p>I have no idea whether he ever got there and happily retired at 60 with a trophy wife or the <a href="https://www.youtube.com/watch?v=OHINYENLb-8" rel="nofollow">censors and editors got the better of him</a>.
But twenty-one years is a long time
in this business. We now have LoRA fine-tunes, voice cloning good enough to
fool a phone call, and AI creeping into cyberphysical design. Between the
generator and the goal, the gap has narrowed considerably. Put Claude to work
on the boring half and you will find you have the afternoons.</p> <p>Which brings me back to my obsolescence, and what it actually consists of. I
am not being replaced. I am being <em>multiplied</em>, which is worse in one specific
way: it removes the excuse. When the tooling stops being the bottleneck, the
only remaining bottleneck is knowing what you want. That was always the hard
part, long before any of this existed. I hope my new minions will unblock
some technical articles that I had way too long in draft here.</p> <p>So I will take it. And if the machines do eventually take over and rule us
completely, I would not mind at all if they turned up in the shape of Sawa
Suzuki in <a href="https://tiff.net/events/a-new-love-in-tokyo" rel="nofollow">Banmei Takahashi’s A New Love in Tokyo</a>,
which I spent an unreasonable portion of <a href="/blog/2026.01.10">1997 hunting down over a 14.4k modem</a>.
However, I know my luck. We will go out to an <a href="https://open.spotify.com/show/4yjZaPZGaVYr8VRWwzG1vM?si=R0M1Zy4jSkyeUoS7fj-mig" rel="nofollow">AI-engineered bioweapon</a> first,
and I will never have to submit and contemplate my obsolescence. However,
if this turns out to be just the promised force-multiplier, maybe I have more time for campfires,
rum cokes and this blog.</p>`,1);function b(r){var l=y(),u=e(l);c(u,{children:(e,t)=>{a();var r=v();a(15),n(e,r)},$$slots:{default:!0}});var d=o(u,42);t(d,()=>`<code class="language-python"><span class="token keyword">import</span> base64<span class="token punctuation">,</span> json<span class="token punctuation">,</span> urllib<span class="token punctuation">.</span>request

API <span class="token operator">=</span> <span class="token string">"https://discord.com/api/v10"</span>     <span class="token comment"># note: api.discord.com does not resolve</span>

<span class="token keyword">def</span> <span class="token function">call</span><span class="token punctuation">(</span>method<span class="token punctuation">,</span> path<span class="token punctuation">,</span> token<span class="token punctuation">,</span> body<span class="token operator">=</span><span class="token boolean">None</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    req <span class="token operator">=</span> urllib<span class="token punctuation">.</span>request<span class="token punctuation">.</span>Request<span class="token punctuation">(</span>
        <span class="token string-interpolation"><span class="token string">f"</span><span class="token interpolation"><span class="token punctuation">&#123;</span>API<span class="token punctuation">&#125;</span></span><span class="token string">/</span><span class="token interpolation"><span class="token punctuation">&#123;</span>path<span class="token punctuation">&#125;</span></span><span class="token string">"</span></span><span class="token punctuation">,</span> method<span class="token operator">=</span>method<span class="token punctuation">,</span>
        data<span class="token operator">=</span>json<span class="token punctuation">.</span>dumps<span class="token punctuation">(</span>body<span class="token punctuation">)</span><span class="token punctuation">.</span>encode<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">if</span> body <span class="token keyword">else</span> <span class="token boolean">None</span><span class="token punctuation">,</span>
        headers<span class="token operator">=</span><span class="token punctuation">&#123;</span><span class="token string">"Authorization"</span><span class="token punctuation">:</span> <span class="token string-interpolation"><span class="token string">f"Bot </span><span class="token interpolation"><span class="token punctuation">&#123;</span>token<span class="token punctuation">&#125;</span></span><span class="token string">"</span></span><span class="token punctuation">,</span>
                 <span class="token string">"Content-Type"</span><span class="token punctuation">:</span> <span class="token string">"application/json"</span><span class="token punctuation">&#125;</span><span class="token punctuation">)</span>
    <span class="token keyword">with</span> urllib<span class="token punctuation">.</span>request<span class="token punctuation">.</span>urlopen<span class="token punctuation">(</span>req<span class="token punctuation">,</span> timeout<span class="token operator">=</span><span class="token number">30</span><span class="token punctuation">)</span> <span class="token keyword">as</span> r<span class="token punctuation">:</span>
        <span class="token keyword">return</span> json<span class="token punctuation">.</span>loads<span class="token punctuation">(</span>r<span class="token punctuation">.</span>read<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">or</span> <span class="token string">"&#123;&#125;"</span><span class="token punctuation">)</span></code>`,!0),i(d);var f=o(d,4);t(f,()=>`<code class="language-python">chan <span class="token operator">=</span> call<span class="token punctuation">(</span><span class="token string">"POST"</span><span class="token punctuation">,</span> <span class="token string">"users/@me/channels"</span><span class="token punctuation">,</span> TOKEN<span class="token punctuation">,</span>
            <span class="token punctuation">&#123;</span><span class="token string">"recipient_id"</span><span class="token punctuation">:</span> MY_USER_ID<span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token string">"id"</span><span class="token punctuation">]</span>
call<span class="token punctuation">(</span><span class="token string">"POST"</span><span class="token punctuation">,</span> <span class="token string-interpolation"><span class="token string">f"channels/</span><span class="token interpolation"><span class="token punctuation">&#123;</span>chan<span class="token punctuation">&#125;</span></span><span class="token string">/messages"</span></span><span class="token punctuation">,</span> TOKEN<span class="token punctuation">,</span>
     <span class="token punctuation">&#123;</span><span class="token string">"content"</span><span class="token punctuation">:</span> <span class="token string">"I am awake and I have opinions about your code."</span><span class="token punctuation">&#125;</span><span class="token punctuation">)</span></code>`,!0),i(f);var p=o(f,4);t(p,()=>`<code class="language-python"><span class="token comment"># the application: what shows in the profile card</span>
call<span class="token punctuation">(</span><span class="token string">"PATCH"</span><span class="token punctuation">,</span> <span class="token string">"applications/@me"</span><span class="token punctuation">,</span> TOKEN<span class="token punctuation">,</span>
     <span class="token punctuation">&#123;</span><span class="token string">"description"</span><span class="token punctuation">:</span> <span class="token string">"Laptop. Watches CI, complains loudly."</span><span class="token punctuation">&#125;</span><span class="token punctuation">)</span>

<span class="token comment"># the bot user: the name and face in the member list</span>
avatar <span class="token operator">=</span> base64<span class="token punctuation">.</span>b64encode<span class="token punctuation">(</span><span class="token builtin">open</span><span class="token punctuation">(</span><span class="token string">"portrait.jpg"</span><span class="token punctuation">,</span> <span class="token string">"rb"</span><span class="token punctuation">)</span><span class="token punctuation">.</span>read<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span>decode<span class="token punctuation">(</span><span class="token punctuation">)</span>
call<span class="token punctuation">(</span><span class="token string">"PATCH"</span><span class="token punctuation">,</span> <span class="token string">"users/@me"</span><span class="token punctuation">,</span> TOKEN<span class="token punctuation">,</span>
     <span class="token punctuation">&#123;</span><span class="token string">"username"</span><span class="token punctuation">:</span> <span class="token string">"Ayuko Hayami"</span><span class="token punctuation">,</span>
      <span class="token string">"avatar"</span><span class="token punctuation">:</span> <span class="token string-interpolation"><span class="token string">f"data:image/jpeg;base64,</span><span class="token interpolation"><span class="token punctuation">&#123;</span>avatar<span class="token punctuation">&#125;</span></span><span class="token string">"</span></span><span class="token punctuation">&#125;</span><span class="token punctuation">)</span></code>`,!0),i(p);var m=o(p,14);s(m,{src:`/images/goldenboy_illustration.jpg`,alt:`Golden Boy colour illustration — the Madame President and Kintaro`,width:`380`});var h=o(m,19);s(h,{src:`/images/goldenboy_bot_fleet.jpg`,alt:`Three Golden Boy character portraits labelled bot_1 Madame President, bot_2 Ayuko Hayami, bot_3 Reiko Terayama`,width:`620`}),a(19),n(r,l)}export{b as default,l as metadata};
import{$ as e,F as t,M as n,P as r,pt as i,tt as a}from"./C5Qr1tWr.js";import"./xihTtKlq.js";import"./DSJ1rPnI.js";import"./DPw4rzvf.js";import{t as o}from"./BrJmRK04.js";import"./WppY4ym1.js";import"./BIw1C4rS.js";import"./DPsrAEoc.js";var s={title:`SCUQ`,date:`2007-02-19`,updated:`2025-10-03`,categories:[`gradschool`,`coding`,`embedded`],coverImage:`/images/ovg.png`,coverWidth:113,coverHeight:113,excerpt:`A Class Library for the Evaluation of Scalar- and Complex-Valued Uncertain Quantities.`},{title:c,date:l,updated:u,categories:d,coverImage:f,coverWidth:p,coverHeight:m,excerpt:h}=s,g=r(`<!> <h1 id="scuq--a-class-library-for-the-evaluation-of-scalar--and-complex-valued-uncertain-quantities"><a aria-hidden="true" tabindex="-1" href="#scuq--a-class-library-for-the-evaluation-of-scalar--and-complex-valued-uncertain-quantities"><span class="icon icon-link"></span></a>SCUQ – A Class Library for the Evaluation of Scalar- and Complex-Valued Uncertain Quantities</h1> <p>A measurement evaluation is not complete, unless the uncertainty and unit of the measured quantity are also
reported in addition to the measured value. In general, the measured quantity is based
on several correlated other quantities. In most cases the physical model relating these input parameters is known.
A standard evaluating the uncertainty of the measured quantity in this case is proposed by the ISO Guide to the expression of
uncertainty in measurements (GUM). The GUM proposes using the means of frequential statistics to evaluate the problem.
Therefore effects that cannot be expressed using relative long run frequencies (i.e. repeated measurements)
are randomised. Although the GUM is widely accepted and has been ported to national standards, it is a proven
approximation of systematic effects contributing to
the uncertainty of the measured quantity.</p> <p><a href="https://www.wiley.com/en-br/Me%C3%9Funsicherheit+und+Me%C3%9Fdatenauswertung-p-9783527602988" rel="nofollow">Weise and Wöger</a> propose
an alternate approach using Bayesian inference. Bayesian inference allows incorporating
a degree of belief into the statistical evaluation of a quantity. Therefore,
their method can model systematic effects more accurately than the GUM does. According to the
authors, the outcomes of their method are in line with the requirements of the GUM.</p> <p>In this thesis, we evaluate both approaches in general and evaluate the following problems in
particular:</p> <ul><li>propagation of the uncertainty of scalar-valued (real) input quantities contributing to one scalar (real) output parameter,</li> <li>propagation of the uncertainty of complex-valued input quantities contributing to one complex-valued output parameter.</li></ul> <p>Related work focusing on these problem domains is reviewed and a class library implemented
in Python that can be used by software applications to propagate the uncertainty in both cases
automatically, is presented. We implemented methods that use frequential statistics and present
a software design implementing the method proposed by Weise and Wöger. Furthermore, we implemented
classes evaluating the physical units of all quantities of the physical model. These
classes can be used optionally to verify the physical model.</p> <p>We tested the class library by evaluating solved problems of other researchers. Furthermore,
we verified our implementation using a suite of component tests that can also be used to test the
compatibility of the destination platform. Our library evaluated all presented problems correctly,
and it was tested using Python 2.4 and NumPy 1.0.1 on Microsoft Windows XP and SUSE Linux 9.3 on 80x86 platforms.</p> <p>We are confident that this class library can be used as a cornerstone in many software applications for uncertainty
propagation.</p> <ul><li><a href="/images/Diplomarbeit_Reidemeister.pdf">Download the Thesis (PDF)</a></li> <li><a href="https://github.com/treideme/SCUQ" rel="nofollow">Access the Source Code (GitHub)</a></li> <li><a href="https://www.wiley.com/en-br/Me%C3%9Funsicherheit+und+Me%C3%9Fdatenauswertung-p-9783527602988" rel="nofollow">Weise and Wöger Book</a></li></ul> <!>`,1);function _(r){var s=g(),c=e(s);o(c,{children:(e,r)=>{i();var a=t(`This is a repost of my graduate work in Germany. My supervisor retired in 2007 and his university website was 
taken down. That also erased my publicly available thesis. I am reposting it here for archival purposes.`);n(e,a)},$$slots:{default:!0}});var l=a(c,20);o(l,{children:(e,r)=>{i();var a=t(`2025 Update: I have not maintained this code in almost 20 years. Your runway may vary if you try to use it.
Baysian uncertainty propagation does not seem to be coded up anywhere else, so I am keeping this online for archival purposes,
wheras the GUM approach is widely available in other libraries, such as MetroloPy.`);n(e,a)},$$slots:{default:!0}}),n(r,s)}export{_ as default,s as metadata};
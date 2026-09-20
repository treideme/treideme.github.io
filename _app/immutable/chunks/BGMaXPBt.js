import{$ as e,E as t,M as n,P as r,mt as i,pt as a,tt as o}from"./C5Qr1tWr.js";import"./xihTtKlq.js";import"./DSJ1rPnI.js";import"./DPw4rzvf.js";import"./BrJmRK04.js";import"./WppY4ym1.js";import"./BIw1C4rS.js";import"./DPsrAEoc.js";var s={title:`Parsing PDFs in Python`,date:`2014-04-26`,updated:`2025-10-04`,categories:[`postdoc`,`coding`],coverImage:`/images/pdf.png`,coverWidth:400,coverHeight:400,excerpt:`Simple PDF statement parser for Python`},{title:c,date:l,updated:u,categories:d,coverImage:f,coverWidth:p,coverHeight:m,excerpt:h}=s,g=r(`<p>I am a big fan of personal finance and I always like to keep my books up to date. My favourite accounting software is <a href="https://www.gnucash.org/" rel="nofollow">GNU Cash</a>. It’s free, powerful, and allows you to import transactions in various established financial interchange formats,
such as <a href="https://en.wikipedia.org/wiki/Quicken_Interchange_Format" rel="nofollow">Quicken</a>, <a href="https://en.wikipedia.org/wiki/OFX" rel="nofollow">OFX</a>, etc. Unfortunately, some institutions only allow you to export your monthly statements as <a href="https://en.wikipedia.org/wiki/Microsoft_Excel" rel="nofollow">M$ Excel</a>,
or worse, <a href="https://en.wikipedia.org/wiki/PDF" rel="nofollow">PDF</a>.</p> <p>In my particular case it was <a href="https://www.americanexpress.com/en-ca/" rel="nofollow">AMEX Canada</a>, only providing monthly downloadable
PDF statements. Manually copying over the transactions into GNU Cash is not an option for me. I have better things to
do with my time. So I set out to find a solution to convert my AMEX statements into a format that GNU Cash understands,
with QIF being the least painful one to convert to.</p> <h1 id="the-pain-of-making-sense-of-pdfs"><a aria-hidden="true" tabindex="-1" href="#the-pain-of-making-sense-of-pdfs"><span class="icon icon-link"></span></a>The pain of making sense of PDFs</h1> <p>PDF is an evil format. Even though it is called a document, it is more similar to an image format that does not have as
much structure to it as for example XML, HTML, or EPUB for that matter. There have been several attempts to parse PDFs
in Python in the past; however, the packages <a href="https://pybrary.net/pyPdf/" rel="nofollow">PyPDF</a> and <a href="https://pypi.org/project/PyPDF2/" rel="nofollow">PyPDF2</a> are completely oblivious to the layout of the PDF. All you
get is a stream of characters (without any spacing or formatting information).</p> <p>Yuske Shinyama has a <a href="https://www.youtube.com/watch?v=k34wRxaxA_c" rel="nofollow">three-part video series</a> on explaining how to make sense of the raw format. Also feeling the need
to make sense of PDF data, he developed a package called <a href="https://www.unixuser.org/~euske/python/pdfminer/" rel="nofollow">PDFMiner</a> in Python that allows you to extract strings and layout
information from PDFs. He has an elaborate documentation explaining the design of his miner.</p> <p>After a few tries with PyPDF2 I decided to give PDFMiner a chance. Below you find a code snipped that allows you to parse
a PDF and get some structured plain-text content out of it.</p> <pre class="language-python"></pre> <p>With this sample it was just a piece of cake to develop a simple parsing grammar for the transaction records and dump them into a QIF file that could be imported in GNUCash. Since my QIF implementation was quite elaborate to handle all for formatting corner cases I leave you with conceptual line-by-line parser shown above to illustrate the approach.</p> <hr/> <p><a href="https://survivalengineer.blogspot.com/2014/04/parsing-pdfs-in-python.html" rel="nofollow">Crossposted from my old blog</a></p>`,1);function _(r){var s=g(),c=o(e(s),12);t(c,()=>`<code class="language-python"><span class="token comment">#!/usr/bin/env python</span>

<span class="token keyword">import</span> sys
<span class="token keyword">from</span> pdfminer<span class="token punctuation">.</span>pdfparser <span class="token keyword">import</span> PDFParser
<span class="token keyword">from</span> pdfminer<span class="token punctuation">.</span>pdfdocument <span class="token keyword">import</span> PDFDocument
<span class="token keyword">from</span> pdfminer<span class="token punctuation">.</span>pdfpage <span class="token keyword">import</span> PDFPage
<span class="token keyword">from</span> pdfminer<span class="token punctuation">.</span>pdfpage <span class="token keyword">import</span> PDFTextExtractionNotAllowed
<span class="token keyword">from</span> pdfminer<span class="token punctuation">.</span>pdfinterp <span class="token keyword">import</span> PDFResourceManager
<span class="token keyword">from</span> pdfminer<span class="token punctuation">.</span>pdfinterp <span class="token keyword">import</span> PDFPageInterpreter
<span class="token keyword">from</span> StringIO <span class="token keyword">import</span> StringIO
<span class="token keyword">from</span> pdfminer<span class="token punctuation">.</span>layout <span class="token keyword">import</span> LAParams
<span class="token keyword">from</span> pdfminer<span class="token punctuation">.</span>converter <span class="token keyword">import</span> TextConverter

<span class="token keyword">class</span> <span class="token class-name">MyParser</span><span class="token punctuation">(</span><span class="token builtin">object</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> pdf<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token comment">## Snipped adapted from Yusuke Shinyamas </span>
        <span class="token comment">#PDFMiner documentation</span>
        <span class="token comment"># Create the document model from the file</span>
        parser <span class="token operator">=</span> PDFParser<span class="token punctuation">(</span><span class="token builtin">open</span><span class="token punctuation">(</span>pdf<span class="token punctuation">,</span> <span class="token string">'rb'</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        document <span class="token operator">=</span> PDFDocument<span class="token punctuation">(</span>parser<span class="token punctuation">)</span>
        <span class="token comment"># Try to parse the document</span>
        <span class="token keyword">if</span> <span class="token keyword">not</span> document<span class="token punctuation">.</span>is_extractable<span class="token punctuation">:</span>
            <span class="token keyword">raise</span> PDFTextExtractionNotAllowed
        <span class="token comment"># Create a PDF resource manager object </span>
        <span class="token comment"># that stores shared resources.</span>
        rsrcmgr <span class="token operator">=</span> PDFResourceManager<span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token comment"># Create a buffer for the parsed text</span>
        retstr <span class="token operator">=</span> StringIO<span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token comment"># Spacing parameters for parsing</span>
        laparams <span class="token operator">=</span> LAParams<span class="token punctuation">(</span><span class="token punctuation">)</span>
        codec <span class="token operator">=</span> <span class="token string">'utf-8'</span>

        <span class="token comment"># Create a PDF device object</span>
        device <span class="token operator">=</span> TextConverter<span class="token punctuation">(</span>rsrcmgr<span class="token punctuation">,</span> retstr<span class="token punctuation">,</span> 
                               codec <span class="token operator">=</span> codec<span class="token punctuation">,</span> 
                               laparams <span class="token operator">=</span> laparams<span class="token punctuation">)</span>
        <span class="token comment"># Create a PDF interpreter object</span>
        interpreter <span class="token operator">=</span> PDFPageInterpreter<span class="token punctuation">(</span>rsrcmgr<span class="token punctuation">,</span> device<span class="token punctuation">)</span>
        <span class="token comment"># Process each page contained in the document.</span>
        <span class="token keyword">for</span> page <span class="token keyword">in</span> PDFPage<span class="token punctuation">.</span>create_pages<span class="token punctuation">(</span>document<span class="token punctuation">)</span><span class="token punctuation">:</span>
            interpreter<span class="token punctuation">.</span>process_page<span class="token punctuation">(</span>page<span class="token punctuation">)</span>
        
        self<span class="token punctuation">.</span>records            <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
        
        lines <span class="token operator">=</span> retstr<span class="token punctuation">.</span>getvalue<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>splitlines<span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">for</span> line <span class="token keyword">in</span> lines<span class="token punctuation">:</span>
            self<span class="token punctuation">.</span>handle_line<span class="token punctuation">(</span>line<span class="token punctuation">)</span>
    
    <span class="token keyword">def</span> <span class="token function">handle_line</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> line<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token comment"># Customize your line-by-line parser here</span>
        self<span class="token punctuation">.</span>records<span class="token punctuation">.</span>append<span class="token punctuation">(</span>line<span class="token punctuation">)</span>

<span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">'__main__'</span><span class="token punctuation">:</span>
    p <span class="token operator">=</span> MyParser<span class="token punctuation">(</span>sys<span class="token punctuation">.</span>argv<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
    <span class="token keyword">print</span> <span class="token string">'&#92;n'</span><span class="token punctuation">.</span>join<span class="token punctuation">(</span>p<span class="token punctuation">.</span>records<span class="token punctuation">)</span></code>`,!0),i(c),a(6),n(r,s)}export{_ as default,s as metadata};
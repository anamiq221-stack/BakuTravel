import React, { useEffect, useRef, useState } from 'react';
import { MessageCircle, Sparkles, X } from 'lucide-react';
import { guideAnswer, starterPrompts } from './utils/guideLogic';

export default function GuideChat({ context, onOpenVenue }) {
  const [open,setOpen] = useState(false);
  const [input,setInput] = useState('');
  const [messages,setMessages] = useState([]);
  const drawer = useRef(null);
  const history = useRef(null);

  useEffect(() => {
    if (open) drawer.current.showModal();
    else if (drawer.current.open) drawer.current.close();
  }, [open]);

  useEffect(() => {
    if (open) history.current.scrollTop = history.current.scrollHeight;
  }, [messages,open]);

  function ask(text) {
    const prompt = text.trim();
    if (!prompt) return;
    const priorVenues = messages.findLast(message => message.venues.length)?.venues ?? [];
    const answer = guideAnswer(prompt,context,priorVenues.map(venue => venue.id));
    setMessages(previous => [...previous,{ prompt,...answer }]);
    setInput('');
  }

  const prompts = <div className="guide-prompts">{starterPrompts.map(prompt => <button className="pill" key={prompt} onClick={() => ask(prompt)}>{prompt}</button>)}</div>;

  return <>
    <button className="primary guide-launcher" aria-haspopup="dialog" onClick={() => setOpen(true)}>
      <MessageCircle size={20}/><span>Ask Baku AI Guide</span>
    </button>
    <dialog ref={drawer} className="guide-drawer" aria-labelledby="guide-title" onCancel={event => { event.preventDefault(); setOpen(false); }} onClick={event => { if (event.target === drawer.current) setOpen(false); }}>
      <div className="guide-inner">
        <div className="panel-heading"><span className="icon-tile"><Sparkles size={20}/></span><div><h2 id="guide-title">Baku AI Guide</h2><p>Local guide · works offline</p></div><button className="icon-button" aria-label="Close guide" onClick={() => setOpen(false)}><X size={19}/></button></div>
        <div className="guide-history" ref={history} role="log" aria-label="Guide conversation">
          <p className="guide-bubble answer">Welcome to BakuTravel. Ask me about places to visit, menu prices, getting around or your current schedule.</p>
          {messages.length === 0 && prompts}
          {messages.map(({ prompt,text,venues,link },index) => <div className="guide-turn" key={index}>
            <p className="guide-bubble prompt">{prompt}</p>
            <div className="guide-bubble answer"><p>{text}</p>
              {link && <a href={link[1]} target="_blank" rel="noreferrer">{link[0]}</a>}
              {venues.length > 0 && <div className="pills">{venues.map(venue => <button className="pill" key={venue.id} onClick={() => { drawer.current.close(); setOpen(false); onOpenVenue(venue); }}>{venue.name}</button>)}</div>}
            </div>
          </div>)}
          {messages.length > 0 && <details className="guide-suggestions"><summary>Starter prompts</summary>{prompts}</details>}
        </div>
        <form className="compose guide-compose" onSubmit={event => { event.preventDefault(); ask(input); }}>
          <input aria-label="Ask the guide" placeholder="Ask about Baku…" maxLength={350} value={input} onChange={event => setInput(event.target.value)}/>
          <button className="primary" type="submit" disabled={!input.trim()}>Send</button>
        </form>
      </div>
    </dialog>
  </>;
}

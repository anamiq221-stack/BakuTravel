import React, { useState } from 'react';
import { CalendarDays, Plus, Sparkles } from 'lucide-react';
import { CatalogSearch } from './CatalogControls';
import { filterCatalog } from './utils/catalog';
import { interests, groups, parseBudget, planRecommendations } from './utils/guideLogic';
import { fromCurrency, money, segmentFor } from './utils/segmentLogic';

const questions = ['What is your total budget for Baku?', 'How many days will you be staying in Baku?', 'Who are you traveling with?', 'What would you like to explore?'];

export default function TripInterview({ trip, complete, currency, venues, entries, catalog, districts, onComplete, renderCard, onAdd }) {
  const [step,setStep] = useState(complete ? questions.length : 0);
  const [draft,setDraft] = useState(trip);
  const [input,setInput] = useState('');
  const [error,setError] = useState('');
  const [query,setQuery] = useState('');
  const [district,setDistrict] = useState('all');
  const selected = draft.interests;
  const answers = [
    money(draft.budget,currency),
    draft.days + (draft.days === 1 ? ' day' : ' days'),
    groups.find(([id]) => id === draft.party)[1],
    interests.filter(([id]) => selected.includes(id)).map(([,label]) => label).join(', ') || 'No preference'
  ];

  function advance(key,value) {
    setDraft(previous => ({ ...previous,[key]:value }));
    setInput('');
    setError('');
    setStep(step+1);
  }
  function finish(skip = false) {
    const final = skip ? { ...draft, interests:[] } : draft;
    setDraft(final);
    onComplete(final);
    setStep(questions.length);
  }
  function submit(event) {
    event.preventDefault();
    if (step === 0) {
      const value = parseBudget(input,currency);
      if (value === null) { setError('Enter an amount such as ₼250 or 150 USD.'); return; }
      advance('budget',value);
    }
    if (step === 1) {
      const value = Number(input);
      if (!Number.isInteger(value) || value < 1 || value > 14) { setError('Enter a whole number from 1 to 14.'); return; }
      advance('days',value);
    }
  }
  function restart() {
    setDraft(trip);
    setInput('');
    setError('');
    setStep(0);
  }
  function edit(index) {
    setInput('');
    setError('');
    setStep(index);
  }
  const done = step === questions.length;
  const candidates = query || district !== 'all' ? filterCatalog(catalog,{ query,district }) : venues;
  const picks = done ? planRecommendations(candidates,trip,entries) : [];

  return <>
    <div className="page-heading"><h1>AI Search</h1><p>Tell us about your trip to get a budget-matched itinerary shortlist.</p></div>
    <section className="panel interview" aria-label="Baku trip interview">
      <div className="panel-heading"><span className="icon-tile"><Sparkles size={20}/></span><div><h2>Trip interview</h2><p>{done ? segmentFor(Math.floor(trip.budget/trip.days),trip.party) : 'Question ' + (step+1) + ' of 4'}</p></div></div>
      {step > 0 && <div className="interview-answers">
        {answers.slice(0,step).map((answer,index) => <button key={questions[index]} type="button" className="pill preset" aria-label={'Edit answer: ' + questions[index] + ' ' + answer} onClick={() => edit(index)}>{answer}</button>)}
      </div>}
      {done ? <button className="pill" onClick={restart}>Start over</button> : <div className="interview-question">
        <h3 aria-live="polite">{questions[step]}</h3>
        {step === 0 && <div className="pills">{(currency === 'USD' ? [120,250,500,1000] : [200,425,850,1700]).map(value => <button type="button" className="pill" key={value} onClick={() => advance('budget',fromCurrency(value,currency))}>{money(fromCurrency(value,currency),currency)}</button>)}</div>}
        {step === 1 && <div className="pills">{[1,2,3,4,7,14].map(value => <button type="button" className="pill" key={value} onClick={() => advance('days',value)}>{value} {value === 1 ? 'day' : 'days'}</button>)}</div>}
        {step < 2 && <form className="compose" onSubmit={submit}>
          <input aria-label={step === 0 ? 'Custom budget' : 'Custom duration'} value={input} onChange={event => { setInput(event.target.value); setError(''); }} inputMode={step === 1 ? 'numeric' : 'text'} placeholder={step === 0 ? 'Amount in ' + currency + ', or e.g. 250 USD' : 'Enter a number from 1 to 14'}/>
          <button className="primary" type="submit">Continue</button>
        </form>}
        {error && <p className="over" role="alert">{error}</p>}
        {step === 2 && <div className="pills">{groups.map(([id,label]) => <button className="pill" type="button" key={id} onClick={() => advance('party',id)}>{label}</button>)}</div>}
        {step === 3 && <>
          <div className="pills">{interests.map(([id,label]) => <button className={'pill ' + (selected.includes(id) ? 'active' : '')} aria-pressed={selected.includes(id)} type="button" key={id} onClick={() => setDraft(previous => ({ ...previous,interests:selected.includes(id) ? selected.filter(item => item !== id) : [...selected,id] }))}>{label}</button>)}</div>
          <div className="pills"><button type="button" className="primary" onClick={() => finish()}><Sparkles size={17}/> Find my places</button><button type="button" className="pill" onClick={() => finish(true)}>Skip interests</button></div>
        </>}
      </div>}
    </section>
    {done && <section className="interview-results" aria-labelledby="recommendation-title">
      <div className="section-heading"><h2 id="recommendation-title">Best Recommended Places for You</h2><p>{money(Math.floor(trip.budget/trip.days),currency)} per day for your group. Estimates reflect the plans already in your schedule.</p></div>
      <CatalogSearch {...{query,setQuery,district,setDistrict,districts}}/>
      {picks.length ? <div className="posters">{picks.map(pick => renderCard(pick.venue,<div className="quick-plan">
        <span className="metadata"><CalendarDays size={15}/> Day {pick.day+1} · {pick.cost ? money(pick.cost,currency) + ' for group' : 'Free'}</span>
        <button className="primary" onClick={() => onAdd(pick)}><Plus size={16}/> Add to Schedule</button>
      </div>))}</div> : <div className="panel empty">There are no additional matches within your remaining budget.</div>}
    </section>}
  </>;
}

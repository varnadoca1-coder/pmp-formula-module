async function callClaude(userMsg){
  const system = `You are an expert PMP exam tutor specializing in IT Project Management. You know all PMP formulas deeply: Earned Value Management (EV,PV,AC,CV,SV,CPI,SPI,EAC,ETC,VAC,TCPI), PERT, Critical Path, Communication Channels, EMV, financial metrics (NPV, ROI, BCR, PV). Give concise, exam-focused answers. Use specific numbers and examples from IT projects. Keep responses under 200 words unless explaining complex topics.`;
  const msgs = state.aiMessages.map(m=>({role:m.role==='ai'?'assistant':'user',content:m.text}));
  msgs.push({role:'user',content:userMsg});
  const resp = await fetch('https://api.anthropic.com/v1/messages',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({model:'claude-sonnet-4-20250514',max_tokens:1000,system,messages:msgs})
  });
  if(!resp.ok) throw new Error(`API error ${resp.status}`);
  const data = await resp.json();
  return data.content.map(c=>c.text||'').join('');
}

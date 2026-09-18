export function HeroSignal() {
  return <aside className="hero-signal" aria-label="Interface operacional demonstrativa">
    <div className="signal-meta"><span>OPERAÇÃO / VISÃO GERAL</span><span><i /> SISTEMA ONLINE</span></div>
    <div className="signal-metrics">
      <article><span>Entrada</span><strong>Centralizada</strong><small>contatos e pedidos</small></article>
      <article><span>Acompanhamento</span><strong>Visível</strong><small>etapas e responsáveis</small></article>
      <article><span>Rotinas</span><strong>Conectadas</strong><small>menos controles dispersos</small></article>
      <article><span>Gestão</span><strong>Mensurável</strong><small>indicadores da operação</small></article>
    </div>
    <div className="signal-flow" aria-hidden="true"><span>ENTRADA</span><i /><b /><i /><b /><i /><span>RELATÓRIO</span></div>
    <div className="signal-status">
      <p><i /><span>Entrada organizada</span><small>FLUXO</small></p>
      <p><i /><span>Histórico centralizado</span><small>CONTEXTO</small></p>
      <p><i /><span>Processo acompanhável</span><small>ETAPAS</small></p>
      <p><i /><span>Indicadores disponíveis</span><small>GESTÃO</small></p>
    </div>
    <div className="signal-readout"><span>FLOW / OPS 01</span><span>fluxo ilustrativo</span></div>
  </aside>;
}

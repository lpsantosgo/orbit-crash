# Orbit Crash

Crie um jogo web completo do gênero Crash Game, desenvolvido exclusivamente para fins de estudo e demonstração de interface, com aparência profissional de plataforma de cassino online.

IMPORTANTE:

Não copie logos, imagens, personagens, textos, sons ou identidade visual de Aviator ou qualquer outro jogo existente.

Crie uma identidade visual própria e original.

O jogo deve funcionar como uma simulação, utilizando apenas créditos virtuais/fictícios.

Não implementar pagamentos reais, PIX, depósitos, saques ou qualquer sistema de dinheiro real.

CONCEITO

O jogo deve apresentar uma rodada em que um multiplicador começa em 1.00x e aumenta progressivamente:

1.00x → 1.01x → 1.05x → 1.20x → 2.00x → 3.50x → etc.

Em determinado momento, a rodada deve sofrer um "CRASH" e parar.

O jogador pode apostar créditos virtuais antes da rodada começar e utilizar o botão SACAR durante a rodada para encerrar a aposta no multiplicador atual.

Exemplo:

Aposta: 100 créditos
Cashout em: 2.50x
Prêmio virtual: 250 créditos

Caso o crash aconteça antes do cashout, a aposta é perdida.

DESIGN

Crie uma interface extremamente moderna, premium e responsiva, inspirada na estética de plataformas de cassino modernas, mas com identidade visual original.

Utilize:

Fundo escuro sofisticado

Gradientes modernos

Painéis com efeito glassmorphism

Bordas suaves

Sombras discretas

Animações fluidas

Tipografia moderna

Elementos neon discretos

Excelente contraste

Layout profissional

O jogo deve parecer um produto comercial de alto nível.

ÁREA PRINCIPAL

No centro da tela deve existir um grande painel representando a área da rodada.

No topo do painel mostrar:

"CRASH"

Durante a rodada, o multiplicador deve aparecer extremamente grande:

1.00x
1.25x
1.80x
2.50x
5.20x

Quando ocorrer o crash:

"CRASHED AT 5.20x"

O multiplicador deve possuir uma animação suave e dinâmica.

Adicione uma trajetória visual crescente no painel, como uma curva/gráfico animado acompanhando o crescimento do multiplicador.

Utilize um elemento visual original, como um foguete, nave ou outro indicador próprio, em vez de copiar o avião do Aviator.

CONTROLES DO JOGADOR

Abaixo do gráfico crie um painel de aposta contendo:

Campo de valor da aposta

Botão "-"

Botão "+"

Botões rápidos:

10

25

50

100

500

Botão principal "APOSTAR"

Depois que a aposta for realizada, o botão deve mudar para:

"SACAR 1.00x"

Durante a rodada, atualizar dinamicamente:

"SACAR 1.52x"
"SACAR 2.18x"
"SACAR 3.47x"

Quando o jogador realizar o cashout, mostrar:

"VOCÊ SACOU EM 2.85x"

e apresentar o valor virtual ganho.

SALDO

No topo da interface mostrar:

SALDO

"10.000,00"

Utilizar créditos fictícios.

Adicionar botão:

"+ ADICIONAR CRÉDITOS"

Esse botão deve apenas adicionar créditos virtuais para fins de demonstração.

HISTÓRICO DAS RODADAS

Criar uma barra horizontal ou painel chamado:

"RODADAS ANTERIORES"

Mostrar vários multiplicadores:

1.24x
2.15x
1.03x
8.72x
3.41x
1.18x
12.45x
2.87x

Utilizar cores diferentes de acordo com o resultado, mantendo uma estética elegante.

Adicionar animação quando uma nova rodada entrar no histórico.

JOGADORES

Criar uma tabela lateral chamada:

"JOGADORES"

Mostrar jogadores fictícios:

Carlos
Lucas
Marcos
Pedro
Ana
Julia
Rafael

Colunas:

JOGADOR
APOSTA
MULTIPLICADOR
GANHO

Exemplo:

Carlos | 100 | 2.40x | +240
Lucas | 50 | 1.85x | +92,50
Marcos | 200 | CRASH | -200

Os jogadores são apenas simulados.

STATUS DA RODADA

Criar estados claros:

AGUARDANDO PRÓXIMA RODADA

INICIANDO...

RODADA EM ANDAMENTO

CRASH!

A transição entre os estados deve ser muito fluida.

ANIMAÇÕES

Adicionar:

Contagem regressiva antes da rodada

Animação de entrada do multiplicador

Crescimento progressivo da curva

Movimento do elemento visual da rodada

Efeito visual no momento do crash

Animação de cashout

Atualização automática do histórico

Microanimações nos botões

Hover effects

Transições suaves

Não exagerar nos efeitos para não prejudicar a performance.

RESPONSIVIDADE

O jogo precisa ser totalmente responsivo.

Desktop:

gráfico grande no centro

controles abaixo

histórico e jogadores nas laterais

Tablet:

reorganizar os painéis automaticamente

Mobile:

ocupar toda a tela disponível

interface otimizada para toque

gráfico no topo

multiplicador grande

controles de aposta abaixo

histórico em formato horizontal

jogadores abaixo dos controles

botões grandes e fáceis de tocar

evitar qualquer necessidade de zoom

No mobile, abrir a experiência em tela cheia sempre que isso for permitido pelo navegador.

ARQUITETURA

Crie o projeto de maneira organizada e componentizada.

Separar claramente:

Game Board

Multiplier

Crash Animation

Betting Panel

Balance

Round History

Players List

Countdown

Game State

Virtual Wallet

O código deve ser limpo, organizado e fácil de modificar posteriormente.

LÓGICA DA SIMULAÇÃO

Implementar um sistema de rodadas fictícias.

Fluxo:

WAITING
↓
COUNTDOWN
↓
RUNNING
↓
CRASH
↓
RESULT
↓
WAITING

Cada rodada deve possuir um multiplicador final aleatório para fins de demonstração.

O multiplicador deve crescer de maneira contínua e visualmente agradável.

Importante: deixar toda essa lógica claramente identificada como simulação educacional, sem qualquer mecanismo de dinheiro real.

EXPERIÊNCIA VISUAL

Quero que o resultado final tenha aparência de um produto profissional de cassino moderno, com:

visual premium

interface limpa

boa hierarquia visual

excelente UX

animações modernas

responsividade perfeita

acabamento profissional

Não quero uma aparência de projeto genérico ou template básico.

Crie uma identidade visual própria para o jogo e dê a ele um nome original, por exemplo:

"NOVA CRASH"

ou outro nome original que combine com o design.

O resultado deve parecer um protótipo comercial de alta qualidade, mas permanecer completamente baseado em créditos virtuais e destinado a estudo/demonstração.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/43d6fc8c-b72c-4de2-8426-abcf3784ebae).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

# 🍅 Chronos Pomodoro

Uma aplicação moderna de Pomodoro construída com React, TypeScript e TailwindCSS, seguindo princípios de código limpo e arquitetura modular.

## ✨ Funcionalidades

- ⏱️ **Timer Pomodoro**: 25 minutos de foco com progresso circular visual
- ☕ **Pausas Personalizáveis**: Pausa curta (1-15min) e longa (15-45min)
- 🎯 **Metas Diárias**: Configure e acompanhe seu progresso
- 📊 **Histórico**: Visualize ciclos completados e tempo focado
- 🌙 **Tema Claro/Escuro**: Interface adaptável
- 💾 **Persistência**: Dados salvos automaticamente no localStorage
- 📱 **Responsivo**: Funciona em desktop e mobile

## 🚀 Como usar

### Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/chronos-pomodoro.git

# Entre no diretório
cd chronos-pomodoro

# Instale as dependências
npm install

# Execute em modo desenvolvimento
npm run dev
```

### Controles

- **▶️/⏸️**: Iniciar/Pausar timer
- **🔄**: Reset do timer atual
- **⏰**: Pausa curta (configurável)
- **⏲️**: Pausa longa (configurável)
- **🔶**: Reset Cycle (volta para 25min de foco)

### Atalhos de Teclado

- **Espaço**: Play/Pause
- **R**: Reset

## 🏗️ Arquitetura

O projeto segue princípios de **Clean Code** e **Separation of Concerns**:

```
src/
├── components/           # Componentes React
│   ├── ui/              # Componentes de interface reutilizáveis
│   ├── modals/          # Componentes de modais
│   └── Pomodoro.tsx     # Componente principal
├── hooks/               # Custom hooks
├── types/               # Definições TypeScript
├── constants/           # Constantes da aplicação
├── utils/               # Funções utilitárias
└── styles/              # Estilos CSS
```

### Componentes Principais

- **`Pomodoro.tsx`**: Componente principal que orquestra a aplicação
- **`CircularProgress.tsx`**: Progresso circular do timer
- **`ProgressBar.tsx`**: Barra de progresso da meta diária
- **`Button.tsx`**: Componente de botão reutilizável

### Custom Hooks

- **`usePomodoro`**: Gerencia estado e lógica do timer
- **`useSettings`**: Gerencia configurações e tema
- **`useCurrentTask`**: Gerencia tarefa atual

### Utilitários

- **`time.ts`**: Funções para formatação e cálculos de tempo
- **`storage.ts`**: Funções para localStorage com tratamento de erros

## 🎨 Design System

### Cores

- **Verde**: Foco e ações principais
- **Azul**: Pausas e ações secundárias
- **Roxo**: Pausa longa
- **Laranja**: Reset cycle
- **Cinza**: Ações neutras

### Temas

- **Escuro**: Fundo gradiente cinza escuro
- **Claro**: Fundo gradiente branco/cinza claro

## 🔧 Tecnologias

- **React 18**: Biblioteca principal
- **TypeScript**: Tipagem estática
- **TailwindCSS**: Estilização utilitária
- **Vite**: Build tool e dev server
- **Lucide React**: Ícones modernos

## 📱 Funcionalidades Avançadas

### Persistência de Dados
Todos os dados são salvos automaticamente:
- Tema preferido
- Configurações de tempo
- Ciclos completados
- Meta diária
- Tarefa atual

### Responsividade
Interface adaptada para:
- Desktop (1024px+)
- Tablet (768px-1023px)
- Mobile (320px-767px)

### Acessibilidade
- Contraste adequado em ambos os temas
- Navegação por teclado
- Labels semânticos
- ARIA attributes

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para detalhes.

## 🙏 Agradecimentos

- Francesco Cirillo pela criação da Técnica Pomodoro
- Comunidade React e TypeScript
- Contribuidores do TailwindCSS

---

**Feito com 💚 por Lucas Lima (https://github.com/lucaaslimadev)**

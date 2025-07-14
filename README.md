# LW Frontend

Sistema frontend para cadastro de contas e gerenciamento de movimentações financeiras, desenvolvido com Next.js e seguindo o padrão MVVM.

## 🚀 Tecnologias

- **Framework**: Next.js 15
- **Linguagem**: TypeScript
- **Estilização**: Material-UI (MUI)
- **Gerenciamento de Estado**: TanStack Query (React Query)
- **Formulários**: React Hook Form
- **Validação**: Zod
- **Linting**: ESLint
- **Formatação**: Prettier

## 📸 Screenshots

### Dashboard de Contas

<!-- Adicione aqui o screenshot do dashboard de contas -->

### Cadastro de Contas

<!-- Adicione aqui o screenshot do cadastro de contas -->

### Dashboard de Movimentações

<!-- Adicione aqui o screenshot do dashboard de movimentações -->

### Cadastro de Movimentações

<!-- Adicione aqui o screenshot do cadastro de movimentações -->

### Filtros Avançados

<!-- Adicione aqui o screenshot dos filtros avançados -->

## 🛠️ Como Rodar

### Pré-requisitos

- Node.js (versão 18 ou superior)
- npm
- Variáveis de ambiente configuradas

### Instalação

```bash
# Clone o repositório
git clone git@github.com:victordsantoss/lw-front.git

# Entre no diretório
cd lw-front

# Configure as variáveis de ambiente
# Crie um arquivo .env.local baseado no .env.example
NEXT_PUBLIC_API_URL=http://localhost:3000

# Instale as dependências
npm install

```

### Desenvolvimento

```bash
# Inicie o servidor de desenvolvimento
npm run dev
```

## 📁 SSR e Lazy Loading

### Server-Side Rendering (SSR)

O sistema utiliza SSR para melhorar performance e SEO:

- **Páginas renderizadas no servidor**: Dados são buscados no servidor antes da renderização
- **Filtros via URL**: Parâmetros de pesquisa são processados no servidor
- **Cache inteligente**: Implementação de cache com `revalidateTag` para atualizações eficientes
- **Revalidação automática**: Actions para invalidar cache quando necessário

```typescript
// Exemplo de implementação SSR
export default async function MovementDashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const filters = await searchParams;

  const [movements] = await Promise.all([
    await apiFetch<MovementDashboardResponse>(
      '/movements',
      {
        method: 'GET',
        next: { tags: ['movement-dashboard'] },
        cache: 'no-cache',
      },
      filters
    ),
  ]);

  return <MovementDashboardViewModel movements={movements} />;
}
```

### Lazy Loading

Sistema de carregamento otimizado:

- **Loading Components**: Componentes `loading.tsx` para cada página
- **Suspense Boundaries**: Implementação de boundaries para carregamento progressivo
- **Skeleton Loading**: Componentes visuais de loading para melhor UX

```typescript
// Exemplo de loading component
export default function PageLoading() {
  return <TableSkeleton />;
}
```

## 📁 Estrutura de Pastas

```
src/
├── app/                      # App Router (Next.js)
│   ├── (authenticated)/      # Rotas protegidas
│   │   ├── home/            # Dashboard principal
│   │   ├── movements/       # Movimentações
│   │   └── layout.tsx       # Layout autenticado
│   ├── (public)/            # Rotas públicas
│   │   ├── login/           # Login
│   │   ├── register/        # Cadastro
│   │   └── layout.tsx       # Layout público
│   └── loading.tsx          # Loading global
├── common/                  # Recursos compartilhados
│   ├── actions/            # Server actions para revalidação
│   ├── enums/              # Enumeradores
│   ├── models/             # Modelos de dados
│   ├── types/              # Tipos TypeScript
│   └── utils/              # Funções utilitárias
├── components/             # Componentes reutilizáveis
│   ├── filter/            # Componente de filtros
│   ├── table/             # Componente de tabela
│   ├── loading/           # Componentes de loading
│   └── layout/            # Layouts da aplicação
├── configs/               # Configurações
│   ├── api/              # Configurações da API
│   └── styles/           # Configurações de estilo
├── contexts/              # Contextos React
├── modules/               # Módulos principais
│   ├── authenticated/     # Módulos autenticados
│   │   ├── accounts/      # Gestão de contas
│   │   │   ├── actions/   # Server actions
│   │   │   ├── components/ # Componentes específicos
│   │   │   ├── features/  # Features (dashboard, etc.)
│   │   │   │   └── dashboard/
│   │   │   │       ├── dashboard.model.ts    # Lógica de negócio
│   │   │   │       ├── dashboard.view.tsx    # Interface visual
│   │   │   │       └── index.tsx             # ViewModel
│   │   │   ├── services/  # Serviços de API
│   │   │   └── defaults/  # Valores padrão
│   │   └── movements/     # Gestão de movimentações
│   │       ├── actions/   # Server actions
│   │       ├── features/  # Features
│   │       │   ├── dashboard/
│   │       │   └── register/
│   │       ├── services/  # Serviços de API
│   │       └── defaults/  # Valores padrão
│   └── public/            # Módulos públicos
│       ├── login/         # Login
│       └── register/      # Cadastro
├── services/              # Serviços globais
└── storages/              # Gerenciamento de storage
```

## 🏗️ Arquitetura MVVM

A aplicação segue rigorosamente o padrão Model-View-ViewModel (MVVM) para garantir separação de responsabilidades e facilitar manutenção.

### Model (.model.ts)

Representa a lógica de negócio e gerenciamento de estado:

```typescript
// Exemplo: dashboard.model.ts
export const useAccountDashboardModel = () => {
  const [showCreateAccountModal, setShowCreateAccountModal] = useState(false);

  const orderOptions: Option[] = [
    { value: 'name', label: 'Nome' },
    { value: 'accountNumber', label: 'Número da Conta' },
  ];

  const onRegisterClick = () => setShowCreateAccountModal(true);

  return {
    orderOptions,
    onRegisterClick,
    showCreateAccountModal,
    setShowCreateAccountModal,
  };
};
```

### View (.view.tsx)

Interface puramente visual, sem lógica de negócio:

```typescript
// Exemplo: dashboard.view.tsx
interface IDashboardViewProps {
  content: Account.IListAccountsResponse;
  orderOptions: Option[];
  onRegisterClick: () => void;
}

export const DashboardView = ({
  content,
  orderOptions,
  onRegisterClick,
}: IDashboardViewProps) => {
  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <FilterViewModel
        searchPlaceholder="Pesquisar por Nome ou Número da Conta"
        onRegisterClick={onRegisterClick}
        orderOptions={orderOptions}
      />
      {/* Mais componentes visuais */}
    </Box>
  );
};
```

### ViewModel (index.tsx)

Ponte entre Model e View, orquestra a lógica de apresentação:

```typescript
// Exemplo: index.tsx (ViewModel)
interface IAccountDashboardViewModelProps {
  accounts: Account.IListAccountsResponse;
}

export default function AccountDashboardViewModel({
  accounts,
}: IAccountDashboardViewModelProps) {
  const model = useAccountDashboardModel();

  return (
    <>
      <AccountDashboardView
        content={accounts}
        orderOptions={model.orderOptions}
        onRegisterClick={model.onRegisterClick}
      />

      {model.showCreateAccountModal && (
        <RegistrationModal
          open={model.showCreateAccountModal}
          onClose={model.closeCreateAccountModal}
        />
      )}
    </>
  );
}
```

### Benefícios da Arquitetura MVVM

1. **Separação de Responsabilidades**: Cada camada tem uma responsabilidade específica
2. **Facilita Testes**: Lógica de negócio isolada no Model
3. **Reutilização**: Views podem ser reutilizadas com diferentes Models
4. **Manutenibilidade**: Mudanças na UI não afetam a lógica de negócio
5. **Escalabilidade**: Estrutura consistente facilita crescimento do projeto

### Fluxo de Dados

```
Server (SSR) → ViewModel → Model (estado/lógica) → View (UI)
                    ↑           ↓
                 Actions    State Updates
```

## 🔄 Revalidação e Cache

Sistema de cache inteligente com revalidação automática:

```typescript
// Server Action para revalidação
'use server';
import { revalidateTag } from 'next/cache';

export async function revalidateMovementsDashboard() {
  revalidateTag('movement-dashboard');
}
```

Esta estrutura garante que os dados sejam sempre atualizados após operações CRUD, mantendo a performance do SSR.

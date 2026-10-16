# Projeto Caramelo

Site do Projeto Caramelo: resgate, cuidado e adoção de cães e gatos em Cachoeira Paulista (SP).
O site é público e mostra os pets para adoção e as vaquinhas ativas. A área `/admin` é usada
pelos voluntários para cadastrar pets e vaquinhas e lançar doações.

## Stack

- **Next.js** (App Router) + React + Tailwind CSS
- **Firebase**: Auth (login do admin) e Firestore (pets, vaquinhas e doações)
- **Cloudinary**: hospedagem das fotos enviadas pelo admin

## Rodando localmente

```bash
cp .env.example .env   # preencha os valores
npm install
npm run dev            # http://localhost:3000
```

Para abrir o servidor de dev pelo celular na rede local, coloque o IP em `DEV_ORIGINS` no `.env`.

## Variáveis de ambiente

Veja `.env.example`. O servidor não sobe se faltar alguma obrigatória (`instrumentation.ts`).

| Variável | Para quê |
| --- | --- |
| `NEXT_PUBLIC_FIREBASE_*` | Configuração web do Firebase (pública por natureza) |
| `ADMIN_EMAILS` | E-mails com acesso ao `/admin`, separados por vírgula |
| `CLOUDINARY_*` | Upload e remoção de fotos (o secret fica só no servidor) |
| `NEXT_PUBLIC_SITE_URL` | URL pública do site (canonical, sitemap, cards de compartilhamento) |
| `DEV_ORIGINS` | Opcional, só dev: IPs da rede local liberados |

## Dados (Firestore)

| Coleção | Leitura | Conteúdo |
| --- | --- | --- |
| `pets` | pública | Pets para adoção |
| `vakinhas` | pública | Vaquinhas, com o total arrecadado em `raised` |
| `vakinhaDonations` | só admin | Doações lançadas de cada vaquinha (mesmo id da vaquinha) |

As permissões ficam em `firestore.rules`. A lista de e-mails lá precisa bater com `ADMIN_EMAILS`.

## Admin

1. Crie o usuário em Firebase Console → Authentication → Users.
2. Adicione o e-mail em `ADMIN_EMAILS` e na lista do `firestore.rules`.
3. Publique as regras (abaixo).

## Deploy

1. Publique as regras do Firestore **antes** de publicar o código, sempre que `firestore.rules` mudar:
   ```bash
   npx firebase-tools deploy --only firestore:rules
   ```
2. Configure as variáveis de ambiente na hospedagem e publique (`npm run build && npm start`,
   ou deploy na Vercel).
3. Em Firebase Console → Authentication → Settings → Authorized domains, adicione o domínio de produção.

O site público lê o Firestore com cache: cada alteração no admin atualiza o site na hora, e o cache
expira sozinho em até 5 minutos.

## Verificações

```bash
npm run lint
npx tsc --noEmit
```

O CI (`.github/workflows/ci.yml`) roda essas verificações e o `npm audit` em cada push e PR.

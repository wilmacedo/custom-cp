# Captive Portal Customizado - UniFi Controller

Este é um captive portal customizado para o UniFi Controller que utiliza Next.js, TypeScript e Tailwind CSS.

## 🚀 Funcionalidades

- ✅ Interface moderna e responsiva
- ✅ Validação de código OTP (901)
- ✅ Integração com UniFi Controller API
- ✅ Feedback visual com toasts
- ✅ Validações de segurança
- ✅ Logs de auditoria

## 📋 Pré-requisitos

- Node.js 18+
- UniFi Controller configurado
- Acesso ao UniFi Controller via API

## ⚙️ Configuração

### 1. Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```bash
# UniFi Controller Configuration
UNIFI_CONTROLLER_URL=https://192.168.1.1:8443
UNIFI_USERNAME=admin
UNIFI_PASSWORD=sua_senha_aqui
UNIFI_SITE=default

# Security
NEXTAUTH_SECRET=sua-chave-secreta-aqui
NEXTAUTH_URL=http://localhost:3000
```

### 2. Configuração do UniFi Controller

1. Acesse o UniFi Controller
2. Vá em **Settings** > **Hotspot**
3. Configure o captive portal para usar este servidor
4. Defina a URL de redirecionamento para: `http://seu-servidor:3000/otp-style`

### 3. Instalação e Execução

```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Build para produção
npm run build
npm start
```

## 🔧 Como Funciona

### Fluxo de Autorização

1. **Cliente acessa a rede** → UniFi redireciona para o captive portal
2. **Usuário digita o código OTP** → Interface valida o formato
3. **Server Action processa** → Valida OTP e obtém dados do cliente
4. **UniFi Controller autoriza** → Cliente ganha acesso à rede
5. **Feedback visual** → Toast confirma sucesso ou erro

### Arquitetura com Server Actions

- ✅ **Segurança**: Não expõe endpoints públicos
- ✅ **Simplicidade**: Menos código, menos complexidade
- ✅ **Performance**: Menos overhead de rede
- ✅ **Type Safety**: Melhor tipagem nativa
- ✅ **Manutenibilidade**: Tudo em um lugar só

### Segurança

- ✅ Validação de formato do OTP (3 dígitos)
- ✅ Validação de formato do MAC address
- ✅ Logs de auditoria
- ✅ Tratamento de erros
- ✅ Rate limiting (implementar se necessário)

## 🎯 Código OTP

Por enquanto, o sistema aceita apenas o código **901**. Para integrar com banco de dados:

1. Modifique a função `authenticateOTP` em `/src/app/otp-style/actions.ts`
2. Implemente consulta ao banco de dados
3. Adicione validação de expiração de códigos

## 🔄 Próximos Passos

- [ ] Integração com banco de dados
- [ ] Sistema de geração de códigos OTP
- [ ] Rate limiting
- [ ] Logs mais detalhados
- [ ] Interface de administração
- [ ] Múltiplos códigos OTP
- [ ] Expiração de códigos

## 🐛 Troubleshooting

### Erro de Conexão com UniFi Controller

1. Verifique se o UniFi Controller está acessível
2. Confirme as credenciais no `.env.local`
3. Teste a conectividade: `curl -k https://192.168.1.1:8443/api/login`

### Código OTP não funciona

1. Verifique se está digitando **901**
2. Confirme que o código tem exatamente 3 dígitos
3. Verifique os logs do servidor

### Cliente não é autorizado

1. Verifique se o MAC address está correto
2. Confirme se o UniFi Controller está configurado corretamente
3. Verifique os logs do servidor

## 📝 Logs

Os logs são exibidos no console do servidor:

```
Tentativa de acesso - MAC: 00:11:22:33:44:55, IP: 192.168.1.100, OTP: 901
Acesso autorizado - MAC: 00:11:22:33:44:55, IP: 192.168.1.100
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

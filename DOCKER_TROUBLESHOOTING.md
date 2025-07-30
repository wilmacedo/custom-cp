# Docker Troubleshooting

## 🚨 Erro: Porta 80 já em uso

### Solução 1: Usar outra porta

```bash
# Usar porta 8080 em vez de 80
docker run -p 8080:80 --env-file .env custom-cp

# Acessar em: http://localhost:8080
```

### Solução 2: Parar o serviço que usa a porta 80

```bash
# Ver o que está usando a porta 80
sudo lsof -i :80

# Ou
sudo netstat -tulpn | grep :80

# Parar o serviço (exemplo para Apache)
sudo systemctl stop apache2

# Ou para Nginx
sudo systemctl stop nginx
```

### Solução 3: Usar porta 3000 (padrão)

```bash
# Alterar o Dockerfile para usar porta 3000
EXPOSE 3000
ENV PORT=3000

# Executar
docker run -p 3000:3000 --env-file .env custom-cp

# Acessar em: http://localhost:3000
```

## 🔍 Verificar containers e portas

```bash
# Ver containers rodando
docker ps

# Ver todas as portas em uso
sudo netstat -tulpn

# Ver processos usando uma porta específica
sudo lsof -i :80
```

## 🛠️ Comandos úteis

```bash
# Parar todos os containers
docker stop $(docker ps -q)

# Remover containers parados
docker container prune

# Limpar tudo
docker system prune -a
```

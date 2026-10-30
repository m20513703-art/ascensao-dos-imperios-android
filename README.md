# Ascensão dos Impérios — app Android em desenvolvimento

**Status: rascunho incompleto. Não é uma versão pronta para jogar e não há APK publicado.**

Este é um projeto Android novo, separado do site/protótipo anterior. O escopo definido é um jogo original de estratégia com tema de animais, planejado para as Fortalezas 1 a 4. Este repositório contém apenas uma implementação inicial e ainda não representa o jogo completo.

## Estado atual
- Projeto React Native/Expo com uma primeira interface de jogo e telas para vila, tropas, missões e construção.
- Há lógica experimental para progressão, batalha simplificada, edifícios, tropas e feitiços; ainda precisa de revisão, implementação fiel às regras acordadas e testes.
- As batalhas, posicionamento por arrastar, pesquisa/feitiços, salvamento confiável e progressão entre fortalezas não foram validados como experiência jogável completa.
- Salvamento/contas online com e-mail privado ainda não existem. Não há backend ou sincronização; não inserir credenciais em commits.
- Não foi compilado nem testado num dispositivo Android. **Não há APK disponível neste repositório.**

## Requisitos de produto já definidos
O jogador começa na Fortaleza 1 e progride somente após cumprir requisitos e vencer batalhas. O plano cobre F1–F4, incluindo tropas de animais, construções, muralhas, feitiços, missões progressivas e até sete trabalhadores. Custos das construções/tempos e balanceamento ainda precisam ser confirmados; valores temporários devem ser identificados como provisórios.

## Desenvolvimento
Dependências declaradas em `package.json`. Em um ambiente compatível com Expo/Android, instale as dependências e use o Expo/EAS para executar e compilar. Os comandos abaixo são apenas instruções de desenvolvimento; **não indicam que a compilação foi concluída**:

```sh
npm install
npx expo start
```

Antes de qualquer APK ou publicação, completar os sistemas definidos, executar testes, instalar e testar em dispositivo Android, e atualizar este README com os resultados reais.

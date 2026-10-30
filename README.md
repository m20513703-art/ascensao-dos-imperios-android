# Ascensão dos Impérios — jogo Android em desenvolvimento

**Status real: projeto incompleto. Não é o jogo completo, não está pronto para jogar e nenhum APK deve ser tratado como entrega final.**

Este é o novo projeto Android separado dos protótipos anteriores. A meta acordada é um jogo original de estratégia com progressão contínua pelas **18 Fortalezas**, com mecânicas do gênero de estratégia mobile como referência geral, sem copiar nomes, arte, personagens, mapas ou conteúdo de outros jogos. O conteúdo e as regras detalhadas de F1–F4 estão sendo definidos; F5–F18 ainda precisam ser especificados e projetados. A arquitetura precisa suportar a campanha inteira e testes de progressão em escala — não apenas uma demonstração curta.

## Estado atual do código
- React Native/Expo, com um protótipo inicial bem parcial de Fortaleza 1: vila básica, recrutar Coelhos gratuitamente, iniciar batalha simples e salvar alguns números localmente.
- Não há campanha completa, economia validada, cadeia de requisitos, missões, defesa editável, tropas/edifícios/feitiços das fortalezas futuras, nem jogo completo até F18.
- As batalhas, interface e persistência ainda precisam de QA real em simulador/dispositivo; não afirmar que os fluxos foram testados apenas porque o código existe.
- Ainda não há contas privadas, sincronização ou backend. Não coloque segredos em commits.

## Conteúdo acordado e em definição
O plano de produto é uma única campanha contínua F1–F18. Há especificações iniciais para F1–F4, mas ainda não está tudo implementado nem integralmente testado. Os projetos das Fortalezas 5–18 estão pendentes de definição. Custos, tempos e atributos que não foram confirmados não devem ser apresentados como finais. A progressão precisa ser data-driven e permitir validar requisitos, desbloqueios, batalha, economia, tropas e salvamento em toda a campanha.

## Compilação Android (pipeline de desenvolvimento)
O workflow GitHub Actions em `.github/workflows/android-apk.yml` instala dependências no runner, gera o projeto Android com Expo Prebuild, compila um **APK debug de teste** e faz upload como artifact por 14 dias. Não requer credenciais ou secrets. Este artifact, se produzido, corresponde somente ao código parcial presente no commit e **não é a entrega final do jogo completo**. Workflow: [Build Android APK](../../actions/workflows/android-apk.yml).

Antes de chamar qualquer build de pronta, verificar o resultado da Action e validar APK. Antes da entrega final, completar o desenho e implementação F1–F18, testar progressão e mecânicas ponta a ponta e testar o aplicativo em Android. A compilação por si só não significa que o jogo está concluído.

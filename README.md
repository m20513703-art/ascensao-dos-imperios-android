# Ascensão dos Impérios — jogo Android em desenvolvimento

**Status real: campanha F1–F4 em desenvolvimento. O protótipo ainda não está validado como jogo pronto; builds são APKs de teste, não entrega final.**

Este é o novo projeto Android separado dos protótipos anteriores. A meta acordada é um jogo original de estratégia com progressão contínua pelas **18 Fortalezas**, sem copiar nomes, arte, personagens, mapas ou conteúdo de outros jogos. Esta etapa é limitada a uma campanha contínua jogável de **F1 a F4**; o usuário quer testar essa etapa antes de decidir conteúdo de F5. A implementação segue incompleta, e não se deve anunciar conclusão sem QA real.

## Estado atual do código
- React Native/Expo com implementação de marcos F1–F4, vila, objetivos de progressão, tropas, construções, batalhas simples e salvamento local no aparelho. Os custos/tempos não confirmados são provisórios.
- A vila agora permite arrastar um prédio e soltá-lo sobre outro para trocar posições; construções novas entram automaticamente na grade (não há grade de terreno livre nem posicionamento preciso em células).
- Testes automatizados do modelo de campanha cobrem marcos, capacidade de acampamentos, bloqueio de progressão, salvamento e lógica de troca por arraste. Eles não substituem teste integrado da interface nem uma partida completa em Android.
- Ainda não houve QA em dispositivo/emulador, nem validação ponta a ponta da campanha F1–F4. Não afirmar que o jogo está pronto.
- Ainda não há contas privadas, sincronização ou backend. Não coloque segredos em commits.

## Conteúdo acordado e em definição
O plano de longo prazo é uma campanha F1–F18, mas a entrega atual solicitada é F1–F4. F5–F18 não serão planejadas nesta etapa. Custos, tempos e atributos não confirmados não devem ser apresentados como finais. As regras de campanha ficam em `campaign-rules.cjs` e possuem testes automatizados via `npm test`.

## Compilação Android (pipeline de desenvolvimento)
O workflow GitHub Actions em `.github/workflows/android-apk.yml` instala dependências no runner, gera o projeto Android com Expo Prebuild, compila um **APK debug de teste** e faz upload como artifact por 14 dias. Não requer credenciais ou secrets. Este artifact, se produzido, corresponde somente ao código parcial presente no commit e **não é a entrega final do jogo completo**. Workflow: [Build Android APK](../../actions/workflows/android-apk.yml).

Antes de chamar qualquer build de pronta, verificar o resultado da Action e validar APK. Para considerar F1–F4 pronta, ainda faltam executar e registrar testes ponta a ponta e QA real em Android. A compilação por si só não significa que o jogo está concluído.

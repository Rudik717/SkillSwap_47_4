# Skill Swap

## Как запустить проект

- Установите зависимости:
```
npm install
```

- Чтобы запустить в режиме разработки:
```
npm run dev
```

- Чтобы собрать production-версию:
```
npm run build
```

- Проверить код на ошибки (Eslint):
```
npm run lint
```

- Исправить ошибки (Eslint):
```
npm run lint:fix
```

- Проверить форматирование кода (Prettier):
```
npm run format
```

- Исправить форматирование кода (Prettier):
```
npm run format:fix
```

- Проверить стили на ошибки (Stylelint):
```
npm run stylelint
```

- Исправить ошибки в стилях (Stylelint):
```
npm run stylelint:fix
```

## Структура каталогов

```
/src/
  ├── app/             #  Инициализация приложения
  │   ├── layout/     
  │   ├── routes/
  │   ├── App.tsx    
  ├── ui-kit/          #  UI компоненты
  ├── widgets/         #  Крупные, независимые блоки страниц
  ├── pages/           #  Страницы приложения
  ├── store/           #  Redux Store
  ├── constants/       #  Константы (если понадобятся)
  └── utils/           #  Переиспользуемый код, не имеющий бизнес-логики
```

## Соглашение по неймингу

  | Тип | Стиль | Примеры |
  |-----|-------|---------|
  | **React компоненты** | `PascalCase` | `Button.tsx`, `UserProfile.tsx`, `SkillCard.tsx` |
  | **CSS файлы** | `PascalCase` | `Button.css`, `UserProfile.module.css` |
  | **Хуки** | `camelCase` | `useAuth.ts`, `useSkills.ts` |
  | **Утилиты/Хелперы** | `camelCase` | `formatDate.ts`, `apiClient.ts` |
  | **Типы/Интерфейсы** | `PascalCase` | `types.ts` (файл), `type UserData` (внутри) |
  | **Константы** | `UPPER_SNAKE_CASE` | `API_BASE_URL`, `MAX_ITEMS` |
  | **Директории (слайсы)** | `kebab-case` | `user-profile/`, `skill-management/` |
  | **Storybook stories** | `PascalCase.stories` | `Button.stories.ts` |
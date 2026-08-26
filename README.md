# Emjambre App

![Logo de Emjambre](./docs/ENJAMBRE.jpeg)

Documentación de referencia para el stack del proyecto. **Solo guía de configuración — sin implementación de código aún.**

## Stack

| Herramienta | Rol |
|-------------|-----|
| **Node.js** (última LTS) | Runtime de JavaScript |
| **asdf** | Gestor de versiones (Node, etc.) |
| **Corepack + pnpm** | Gestor de paquetes |
| **React** | Biblioteca de UI |
| **React Aria** | Componentes accesibles (Adobe) |
| **Tailwind CSS** | Utilidades de estilo |

---

## 1. asdf — instalar y usar Node.js (última versión)

[asdf](https://asdf-vm.com/) permite fijar la versión de Node por proyecto.

### Instalar asdf (macOS)

```bash
brew install asdf
```

Agrega asdf a tu shell (ejemplo para zsh):

```bash
echo -e "\n. $(brew --prefix asdf)/libexec/asdf.sh" >> ~/.zshrc
source ~/.zshrc
```

### Plugin de Node y versión más reciente

```bash
asdf plugin add nodejs
asdf install nodejs latest
asdf global nodejs latest
node --version
npm --version
```

### Fijar versión en este proyecto (opcional)

Crea un archivo `.tool-versions` en la raíz:

```
nodejs latest
```

---

## 2. Corepack y pnpm

[Corepack](https://nodejs.org/api/corepack.html) viene con Node 16.10+ y activa gestores como pnpm sin instalarlos globalmente.

```bash
corepack enable
corepack prepare pnpm@latest --activate
pnpm --version
```

### Comandos habituales de pnpm

```bash
pnpm install          # instalar dependencias
pnpm add <paquete>      # agregar dependencia
pnpm run dev            # servidor de desarrollo (cuando exista el proyecto)
pnpm run build          # build de producción
```

---

## 3. React Aria

[React Aria](https://react-spectrum.adobe.com/react-aria/) ofrece hooks y componentes accesibles (WAI-ARIA, teclado, lectores de pantalla).

### Cuando implementes el proyecto

```bash
pnpm add react react-dom
pnpm add react-aria react-aria-components
pnpm add -D @types/react @types/react-dom
```

Documentación oficial:

- [Getting started](https://react-spectrum.adobe.com/react-aria/getting-started.html)
- [Components](https://react-spectrum.adobe.com/react-aria/components.html)

React Aria se integra bien con Tailwind: los componentes exponen estados (`data-hovered`, `data-pressed`, etc.) que puedes estilizar con clases de utilidad.

---

## 4. Tailwind CSS

[Tailwind CSS](https://tailwindcss.com/) es un framework de utilidades CSS.

### Cuando implementes el proyecto (Vite + React)

```bash
pnpm create vite@latest . --template react-ts
pnpm install
pnpm add -D tailwindcss @tailwindcss/vite
```

Configuración mínima en `vite.config.ts`:

```ts
import tailwindcss from "@tailwindcss/vite";

export default {
  plugins: [tailwindcss()],
};
```

Y en tu CSS principal:

```css
@import "tailwindcss";
```

Guía oficial: [Install Tailwind with Vite](https://tailwindcss.com/docs/installation/using-vite)

---

## 5. Orden recomendado de setup (desde cero)

1. Instalar **asdf** y **Node.js latest**
2. Habilitar **Corepack** y activar **pnpm**
3. Crear el proyecto React (Vite + TypeScript)
4. Añadir **Tailwind CSS**
5. Añadir **React Aria** / **React Aria Components**
6. Configurar lint, formato y tests según necesidad

---

## Estructura actual del repositorio

```
emjambreapp/
├── docs/
│   └── ENJAMBRE.jpeg    # Logo / imagen de marca
├── README.md            # Esta guía (español)
└── .gitignore
```

---

## Licencia

Por definir.

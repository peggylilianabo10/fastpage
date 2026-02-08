# 🚀 INSTRUCCIONES DE DEPLOY

## ⚠️ IMPORTANTE: Los cambios NO funcionarán hasta que hagas deploy a Vercel

El error 404 que ves al refrescar es porque **Vercel necesita la nueva configuración**.

## 📋 Archivos Modificados:

1. ✅ `index.html` - Sistema nuclear de control de rutas
2. ✅ `auth.html` - Redirección directa a /dashboard
3. ✅ `vercel.json` - Configuración SPA para manejar /dashboard
4. ✅ `sw.js` - Service Worker actualizado (v5)
5. ✅ `hub.html` - Nuevo Dashboard principal con Modo Clonación
6. ✅ `cloning.html` - Selector de plantillas de negocio
7. ✅ `template-preview.html` - Motor de vista previa dinámica

## 🔧 Opciones para Deploy:

### Opción 1: Deploy con Git (Recomendado)

```bash
git add .
git commit -m "Fix: Dashboard routing with nuclear control system"
git push origin main
```

Vercel hará deploy automáticamente en 30-60 segundos.

### Opción 2: Deploy Manual desde Vercel Dashboard

1. Ve a https://vercel.com/dashboard
2. Selecciona tu proyecto "fastpage"
3. Click en "Deployments"
4. Click en "Redeploy" en el último deployment

### Opción 3: Deploy con Vercel CLI

```bash
vercel --prod
```

## ✅ Verificación Post-Deploy:

1. Espera a que el deploy termine (Vercel te dará un link)
2. **Abre en ventana de incógnito**: `https://tu-app.vercel.app/dashboard`
3. Deberías ver un loader o redirect automático
4. Presiona F5 varias veces - NO debe dar 404

## 🐛 Si Sigue Dando 404:

1. Abre DevTools (F12)
2. Ve a Application > Service Workers
3. Click en "Unregister" para eliminar el SW viejo
4. Refresca la página (Ctrl + Shift + R)

---

## 🎯 Flujo Esperado Después del Deploy:

```
Login → /dashboard → 🔒 Lock activado → React carga → Dashboard visible → F5 → Funciona ✅
```

## 🔍 Logs de Consola Esperados:

```
🔒 [DASHBOARD LOCK] Activated - Blocking all navigation for 3 seconds
Firebase Auth State: user@email.com
🔓 [DASHBOARD LOCK] Released - Navigation enabled
```

---

**¿Necesitas ayuda con Git o Vercel?** Avísame y te guío paso a paso.

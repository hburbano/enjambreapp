import { Button } from "@enjambres/ui";

export function ProfilePage() {
  return (
    <div className="h-full overflow-y-auto px-4 py-4">
      <h1 className="font-display text-2xl font-extrabold text-brand-ink">
        Perfil
      </h1>
      <p className="mt-1 text-sm text-neutral-600">
        La cuenta llega con Supabase en v1. Por ahora es un marcador de
        posición.
      </p>

      <div className="mt-6 flex flex-col items-center rounded-2xl border border-dashed border-black/15 bg-white px-4 py-8 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-yellow text-3xl">
          👤
        </div>
        <p className="mt-3 font-display text-lg font-bold">Invitado</p>
        <p className="mt-1 max-w-xs text-sm text-neutral-600">
          Pronto podrás iniciar sesión, elegir rol (reportero o rescatista) y
          ver tus reportes.
        </p>
        <Button
          className="mt-5"
          onPress={() =>
            window.alert(
              "Autenticación pendiente — se conectará con Supabase en v1.",
            )
          }
        >
          Iniciar sesión
        </Button>
      </div>
    </div>
  );
}

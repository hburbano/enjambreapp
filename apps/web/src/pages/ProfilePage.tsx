import { Button } from "@enjambres/ui";
import { UserIcon } from "../icons";
import { usePageMeta } from "../hooks/usePageMeta";

export function ProfilePage() {
  usePageMeta(
    "Perfil",
    "En Enjambres Colombia puedes reportar sin crear cuenta. El perfil es opcional.",
  );

  return (
    <div className="mx-auto h-full max-w-3xl overflow-y-auto px-4 py-4 md:px-6">
      <h1 className="font-display text-2xl font-extrabold text-brand-ink">
        Perfil
      </h1>
      <p className="mt-1 text-sm text-neutral-600">
        No necesitas registrarte para reportar un enjambre. La cuenta es
        opcional.
      </p>

      <div className="mt-6 flex flex-col items-center rounded-2xl border border-dashed border-black/15 bg-white px-4 py-8 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-yellow text-brand-ink">
          <UserIcon size={32} />
        </div>
        <p className="mt-3 font-display text-lg font-bold">Invitado</p>
        <p className="mt-1 max-w-xs text-sm text-neutral-600">
          Foto y ubicación bastan. Si más adelante quieres avisos o ver tus
          reportes en otro celular, podrás dejar un contacto o guardar una
          identidad ligera.
        </p>
        <Button
          variant="secondary"
          className="mt-5"
          onPress={() =>
            window.alert(
              "La identidad es opcional. En v1 podrás vincular email o WhatsApp para avisos; no es un requisito para reportar.",
            )
          }
        >
          Guardar identidad (opcional)
        </Button>
      </div>

      <div className="mt-4 rounded-2xl border border-black/8 bg-white px-4 py-4">
        <p className="font-display text-sm font-bold text-brand-ink">
          ¿Eres rescatista o apicultor?
        </p>
        <p className="mt-1 text-sm text-neutral-600">
          Para atender reportes sí pediremos una identidad ligera (email o
          teléfono). No aplica a quien solo reporta.
        </p>
      </div>
    </div>
  );
}

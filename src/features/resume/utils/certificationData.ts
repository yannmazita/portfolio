// src/features/resume/utils/certificationData.ts
import { CertificationEntry } from "../types";

export function certificationData(): CertificationEntry[] {
  return [
    {
      id: "cert-1",
      name: "Associate Cloud Engineer",
      issuer: "Google Cloud",
      period: "Juin 2026 -- Juin 2029",
      credentialId: "f693c0b92be54dc0b566a23a4dbcb617",
      description: [
        "Configuration et planification d'environnements cloud sécurisés (gestion des accès IAM, réseau et stockage).",
        "Déploiement, supervision, sécurisation d'applications/infrastructures et gestion des performances multi-projets.",
      ],
    },
  ];
}

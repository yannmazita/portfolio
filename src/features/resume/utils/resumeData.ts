// src/features/resume/utils/resumeData.ts
import { ResumeEntry } from "../types";

export function resumeData(): ResumeEntry[] {
  return [
    {
      id: "job-1",
      company:
        "Ministère des finances - Direction Générale des Finances Publiques",
      role: "Inspecteur Programmeur - Responsable de Service d'Exploitation - IBM z/OS",
      period: "Mai 2024 -- Présent",
      location: "Marseille",
      description: [
        "Exécution des traitements par lot JCL",
        "Management d'une équipe de 8 informaticiens.",
        "Prise/Remonté d'informations aux MOA et autres équipes MOE",
      ],
    },
    {
      id: "job-2",
      company: "DGFIP - Marseille",
      role: "Contrôleur Programmeur - Site National de Sécurité",
      period: "Mai 2023 -- Sep. 2023",
      location: "Marseille",
      description: [
        "Tâches de maintenance de la PKI de la 1ere application interne de transfert de fichiers (ESCALE)",
        "Passage d'un accès direct à l'API à l'utilisation d'un API Gateway pour l'application",
        "Débogage requêtes HTTP entre client - API Gateway - API application",
      ],
    },
    {
      id: "job-3",
      company: "DGFIP - Paris",
      role: "Agent Administratif des FIP - Fiscalité des Particuliers",
      period: "Déc 2021 -- Oct. 2022",
      location: "Paris",
      description: [
        "Calcul de l'impôt (assiette)",
        "Dégrèvements et gestion des contentieux",
      ],
    },
  ];
}

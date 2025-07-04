// src/features/resume/utils/resumeData.ts
import { ResumeEntry } from "../types";

export function resumeData(): ResumeEntry[] {
  return [
    {
      id: "job-2",
      company: "DGFIP - DISI SEOM - ESI Marseille",
      role: "Inspecteur Programmeur - Responsable de Service Exploitation - z/OS",
      period: "Mai 2024 -- Présent",
      location: "Marseille",
      description: [
        "Exécution des traitements par lot JCL",
        "Veille au bon déroulement de l'activité du service",
        "Gestion d'une équipe de 8 informaticiens.",
        "Prise/Remonté d'informations aux MOA et autres équipes MOE",
      ],
    },
    {
      id: "job-1",
      company: "DGFIP - DISI SEOM - ESI Marseille",
      role: "Contrôleur Programmeur",
      period: "Mai 2023 -- Sep. 2023",
      location: "Marseille",
      description: [
        "un truc",
        "un autre truc",
        "encore un autre",
        "un dernier",
      ],
    },
  ];
}

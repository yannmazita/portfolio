// src/features/resume/utils/educationData.ts
import { EducationEntry } from "../types";

export function educationData(): EducationEntry[] {
  return [
    {
      id: "edu-3",
      institution: "ENFIP Toulouse",
      degree: "Stage théorique Inspecteur Programmeur Système d'Exploitation",
      period: "Sep. 2023 -- Mai 2024",
      location: "Toulouse",
    },
    {
      id: "edu-2",
      institution: "ENFIP Toulouse",
      degree: "Stage théorique Contrôleur Programmeur",
      period: "Oct. 2022 -- Mai 2023",
      location: "Toulouse",
    },
    {
      id: "edu-1",
      institution: "Université Paris 1 Panthéon-Sorbonne",
      degree: "Licence 3 Mathématiques et Informatique Appliquées",
      period: "Sep. 2017 -- Sep. 2020",
      location: "Paris",
    },
  ];
}

// src/features/resume/utils/resumeData.ts
import { ResumeEntry } from "../types";

export function resumeData(): ResumeEntry[] {
  return [
    {
      id: "job-1",
      company:
        "Ministère des Finances - Direction Générale des Finances Publiques",
      role: "Inspecteur Programmeur - Responsable de Service Exploitation (Mainframe z/OS)",
      period: "Mai 2024 -- Présent",
      location: "Marseille",
      description: [
        "Management d'une équipe de techniciens d'exploitation garantissant la continuité de service de la production.",
        "Planification et déclenchement de flux complexes et de traitements par lots (JCL) via l'ordonnanceur d'entreprise Axway Automator (gestion des fichiers d'E/S, archivages et restaurations).",
        "Supervision opérationnelle, qualification des anomalies d'exécution et routage structuré des incidents (ticketing ITSM type ServiceNow) vers les équipes de qualification ou de développement.",
      ],
    },
    {
      id: "job-2",
      company: "DGFIP - Marseille",
      role: "Contrôleur Programmeur - Site National de Sécurité (DevSecOps)",
      period: "Mai 2023 -- Sept. 2023",
      location: "Marseille",
      description: [
        "Maintenance de la PKI de la première application interne d'échange de fichiers (Escale).",
        "Migration de flux d'accès directs API vers une architecture sécurisée par API Management (APIM).",
        "Analyse réseau, diagnostic et débogage de flux HTTP et de requêtes (Client, APIM, API).",
      ],
    },
    {
      id: "job-3",
      company: "DGFIP - Paris",
      role: "Agent Administratif des FIP - Fiscalité des particuliers",
      period: "Déc 2021 -- Oct. 2022",
      location: "Paris",
      description: [
        "Calcul de l'impôt (assiette), dégrèvements et gestion des contentieux.",
      ],
    },
  ];
}

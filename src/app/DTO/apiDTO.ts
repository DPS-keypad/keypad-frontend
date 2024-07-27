import { ActionDTO } from "./actionDTO";

export interface ApiDTO {
  api_name: string;
  actions: ActionDTO[];
}

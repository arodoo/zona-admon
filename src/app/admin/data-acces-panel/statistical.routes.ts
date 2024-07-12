import { Routes } from "@angular/router";
import { StatisticalPanelHomeComponent } from "./statistical-panel-home/statistical-panel-home.component";
import { StatisticalPanelSpecificTownComponent } from "./statistical-panel-specific-town/statistical-panel-specific-town.component";

export const STATISTICAL_ROUTES: Routes = [
    {
        path: '',
        component: StatisticalPanelHomeComponent
    },
    {
        path: 'municipality/:municipality',
        component: StatisticalPanelSpecificTownComponent
    }
];
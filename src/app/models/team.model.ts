export interface ITeam {
    name: string,
    mode: string,
    team: {
        white: string,
        black: string,
        gold: string,
        advisor: string,
        guildAdvisor?: string
    },
    description: string
};
export namespace teamEndpoint {
    export const saveTeam = "api/team/save";
    export const listTeam = "api/team/list";
}
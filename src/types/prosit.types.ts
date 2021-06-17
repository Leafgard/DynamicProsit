export interface IPrositDetails {
  title: string
  link: string
  generalization: string
  context: string
  animator: string
  scribe: string
  secretary: string
  manager: string
}

export interface IPrositValue {
  id: number
  value: string
}

export interface IPrositKeyword extends IPrositValue { }
export interface IPrositConstraint extends IPrositValue { }
export interface IPrositProblematic extends IPrositValue { }
export interface IPrositSolution extends IPrositValue { }
export interface IPrositDeliverable extends IPrositValue { }
export interface IPrositAction extends IPrositValue { }

export interface IPrositSlice {
  details: IPrositDetails
  keywords: IPrositKeyword[],
  constraints: IPrositConstraint[],
  problematics: IPrositProblematic[],
  solutions: IPrositSolution[],
  deliverables: IPrositDeliverable[],
  actions: IPrositAction[]
}

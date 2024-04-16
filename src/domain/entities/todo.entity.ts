
export class TodoEntity{
    
    constructor(
        public readonly id: number,
        public readonly text: string,
        public readonly completedAt?: Date|null,
    ){}

    get isCompleted(){
        return !!this.completedAt;
    }

    public static fromObject(object: {[key:string]: any}): TodoEntity{
        const { id, text, completedAt } = object;
        if( !id ) throw 'Id is required.';
        if( !text ) throw 'Text is required.';

        let newCompleteAt;
        if( completedAt){
            newCompleteAt = new Date(completedAt);
            if ( isNaN ( newCompleteAt.getTime() ) ){
                throw 'Completed At must be a valid date';
            }
        }

        return new TodoEntity(id, text, completedAt);
    }

}
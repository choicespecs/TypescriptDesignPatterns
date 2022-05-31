const form = document.querySelector('form');
form?.addEventListener('submit', (e) => {
    e.preventDefault();
})
function myFunction() {
    console.log('works');
}

type Data = {
    id: number;
    username: string;
    information: string;
}

interface Database {
    insert(data: Data) : void;
    delete(id: number) : void;
}

class ApplicationDatabase implements Database {
    constructor(private database : Data[]) {}

    insert(data : Data) {
        this.database.push(data);
    }

    delete(identification: number) {
        this.database = this.database.filter((obj : Data) => {
            return obj.id !== identification;
        })
    }

    read(id: number) {
        return this.database.find((obj: Data) => {
            return obj.id === id;
        })
    }
}

interface Command {
    execute(): any;
    undo() : any;
}

class InsertDatabase implements Command {
    constructor(private database: ApplicationDatabase, private data : Data) {}
    execute() {
        this.database.insert(this.data);
    }
    undo() {
        this.database.delete(this.data.id);
    }
}

class DeleteDatabase implements Command {
    constructor(private database: ApplicationDatabase, private data : Data) {}
    execute() {
        this.database.delete(this.data.id);
    }
    undo() {
        this.database.insert(this.data);
    }
}

class DatabaseApplication {
    private commands : Command[] = [];

    constructor(private database: ApplicationDatabase) {}

    insert(data: Data) {
        const command = new InsertDatabase(this.database, data);
        this.commands.push(command);
        command.execute();
    }

    delete(id : number) {
        const data = this.database.read(id);
        if (data) {
            const command = new DeleteDatabase(this.database, data);
            this.commands.push(command);
            command.execute();
        }
    }

}





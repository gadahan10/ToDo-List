import { generateId } from "../shared/shared-methods";

export class Task {
    taskId: string;
    title: string;
    status: TaskStatus;
    isEditMode: boolean;

    constructor(title: string) {
        this.taskId = generateId(8);
        this.title = title;
        this.status = TaskStatus.IN_PROGRESS;
        this.isEditMode = false;
    }
}

export enum TaskStatus {
    IN_PROGRESS = 1,
    PENDING = 2,
    COMPLETED = 3
}


import {
    Card,
    Button,
    Divider,
    Tooltip,
    Typography,
    CardActions,
    CardContent,
} from '@mui/material';
import { useEffect, useState } from 'react';

import { Show } from '../show';
import { Task } from '../../redux/interfaces/task';
import { useAlertFetch } from '../../hooks/useFetch';

interface TaskCardProps {
    task: Task,
    reload: () => void
    openDrawer: (task?: Task) => () => void
}

export function TaskCard({
    task,
    reload,
    openDrawer,
}: TaskCardProps) {
    const { fetch } = useAlertFetch()
    const [done, setDone] = useState(task.done ?? false)

    const handleDone = () => setDone(!done)

    const handleDelete = () => {
        fetch({
            method: 'DELETE',
            url: `/tasks/${task.uuid}`,
            confirmMessage: 'Are you sure?',
        })
            .then(reload)
            .catch(console.error)
    }

    useEffect(() => {
        if (done != task.done) {
            fetch({
                method: 'PUT',
                body: { ...task, done },
                url: `/tasks/${task.uuid}`,
            })
                .then(console.log)
                .catch(console.error)
        }
    }, [done])

    return (
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    <i>task #{task.uuid}</i>
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                    <Show
                        when={done}
                        fallback={task.title}
                    >
                        <i><s>{task.title}</s></i>
                    </Show>
                </Typography>
                <Divider sx={{ mt: 1, mb: 1 }} />
                <Typography variant="body2" color="text.secondary">
                    <Show
                        when={done}
                        fallback={task.description}
                    >
                        <i><s>{task.description}</s></i>
                    </Show>
                </Typography>
            </CardContent>
            <CardActions>
                <Tooltip title="Edit Task">
                    <Button
                        size='small'
                        onClick={openDrawer(task)}
                    >
                        <i>Edit</i>
                    </Button>
                </Tooltip>
                <Tooltip title="Mark As Done">
                    <Button
                        size='small'
                        onClick={handleDone}
                    >
                        <i>{done ? 'Undone' : 'Done'}</i>
                    </Button>
                </Tooltip>
                <Tooltip title="Mark As Done">
                    <Button
                        size='small'
                        onClick={handleDelete}
                    >
                        <i>Delete</i>
                    </Button>
                </Tooltip>
            </CardActions>
        </Card>
    );
}

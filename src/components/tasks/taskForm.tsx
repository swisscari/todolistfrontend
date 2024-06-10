import { useEffect } from "react";
import { useForm } from "react-hook-form";

import {
    Grid,
    Button,
    styled,
    Divider,
    Checkbox,
    TextField,
    Typography,
    FormControlLabel,
} from "@mui/material"

import { grey } from "@mui/material/colors";

import { Center } from "../center"
import { Task } from "../../redux/interfaces/task"
import { useAlertFetch } from "../../hooks/useFetch";

const StyledBox = styled('form')(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'light' ? '#fff' : grey[800],
}));

interface TaskFormProps {
    task?: Task
    reload: () => void
    closeDrawer: () => void
}

export const TaskForm = ({
    task,
    reload,
    closeDrawer
}: TaskFormProps) => {
    const {
        reset,
        setValue,
        register,
        clearErrors,
        handleSubmit,
        formState: { errors },
    } = useForm<Task>()

    const { fetch } = useAlertFetch()

    const handleCloseDrawer = () => {
        reset()
        clearErrors()
        closeDrawer()
    }

    const onSubmit = (task: Task) => {
        fetch({
            body: task,
            method: !task.uuid ? 'POST' : 'PUT',
            url: '/tasks' + `${!task.uuid ? '' : `/${task.uuid}`}`,
            confirmMessage: !task.uuid ? undefined : 'Are you sure?',
        })
            .then(reload)
            .catch(console.error)

        handleCloseDrawer()
    }

    useEffect(() => {
        if (!!task) {
            Object.entries(task).forEach(en => {
                const [key, value] = en
                setValue<any>(key, value)
            })
        } else {
            reset()
            clearErrors()
        }
    }, [task])

    return (
        <StyledBox
            onSubmit={handleSubmit(onSubmit)}
            sx={{
                height: '100%',
                display: 'flex',
                overflow: 'auto',
                justifyContent: 'center',
                backgroundColor: 'transparent'
            }}
        >
            <Grid
                item
                container
                padding={2}
                spacing={0}
                sm={6} xs={12}
                height={'100%'}
                display={'flex'}
                alignItems={'start'}
                justifyContent={'center'}
                sx={{
                    backgroundColor: '#11191D',
                    border: '1px solid #94A6B8',
                    borderTopLeftRadius: '1rem',
                    borderTopRightRadius: '1rem',
                    borderBottom: 'none',
                }}
            >
                <Grid item xs={12} sm={12}>
                    <Center>
                        <Typography gutterBottom variant="h5" component="div">
                            {!task ? 'New Task Form' : `Editing Task #${task.uuid}`}
                        </Typography>
                    </Center>
                    <Divider sx={{ padding: 1 }} />
                </Grid>
                <Grid item xs={12} sm={10}>
                    <TextField
                        fullWidth
                        label="Title"
                        variant="filled"
                        error={!!errors.title}
                        focused={!!task?.title}
                        helperText={errors.title?.message}
                        InputProps={{ sx: { p: 1 } }}
                        {...register('title', {
                            required: 'Title Required',
                            pattern: {
                                value: /^[\w\s_,.]+$/im,
                                message: 'Title not valid'
                            }
                        })}
                    />
                </Grid>
                <Grid item xs={12} sm={10}>
                    <TextField
                        fullWidth
                        multiline
                        minRows={2}
                        maxRows={4}
                        size='small'
                        variant="filled"
                        label="Description"
                        error={!!errors.description}
                        focused={!!task?.description}
                        helperText={errors.description?.message}
                        {...register('description', {
                            required: 'Description required',
                            pattern: {
                                value: /^[\w\s_,.]+$/im,
                                message: 'Description not valid'
                            }
                        })}
                    />
                </Grid>
                <Grid item xs={12} sm={10} hidden>
                    <FormControlLabel
                        defaultChecked={false}
                        label="Is the task Finished?"
                        control={<Checkbox />}
                        {...register('done')}
                    />
                </Grid>
                <Grid item xs={12} sm={5}>
                    <Center>
                        <Button
                            type="submit"
                            sx={{ mr: 2 }}
                            color='primary'
                            variant='contained'
                        >Save</Button>
                        <Button
                            sx={{ ml: 2 }}
                            color='secondary'
                            variant='contained'
                            onClick={handleCloseDrawer}
                        >Close</Button>
                    </Center>
                </Grid>
            </Grid>
        </StyledBox>
    )
}
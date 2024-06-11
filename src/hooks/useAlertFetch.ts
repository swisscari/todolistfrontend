import { FetchArgs } from "@reduxjs/toolkit/query";
import { useFetchMutation } from "../redux/apis/todoApi";

interface AlertFetchArgs extends FetchArgs {
    errMessage?: string
    succMessage?: string
    confirmMessage?: string
}

export function useAlertFetch() {
    const [fetch, info] = useFetchMutation()
    function fetchFn<T = any>(args: AlertFetchArgs) {
        return new Promise<T | undefined>(async (resolve, reject) => {

            const getData = async () => {
                const res = await fetch(args)

                if (info.isError) {
                    throw info.error
                }

                return res.data
            }

            try {
                let result: T | undefined

                if (!args.confirmMessage) {
                    result = await getData()
                } else {
                    if (confirm(args.confirmMessage)) {
                        result = await getData()
                    }
                }

                !!args.succMessage && alert(args.succMessage)
                resolve(result)
            } catch (err: any) {
                alert(!args.errMessage ? err.message : args.errMessage)
                reject(err)
            }
        })
    }

    return {
        info,
        fetch: fetchFn
    }
}
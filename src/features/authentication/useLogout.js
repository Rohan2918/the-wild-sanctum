import {useMutation,useQueryClient} from "@tanstack/react-query";
import {useNavigate} from "react-router-dom";
import {logout as logoutApi} from "../../services/apiAuth";

export function useLogout(){
    
    const navigate =useNavigate();
    const queryClient =useQueryClient();

    const {mutate:logout,isLoading}=useMutation({
        mutationFn:logoutApi,
        OnSuccess:()=>{
            queryClient.removeQueries();
            navigate("/login",{replace:true});
        },
    });
    return {logout,isLoading};
}
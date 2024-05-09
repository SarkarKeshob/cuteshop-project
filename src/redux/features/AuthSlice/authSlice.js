import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../../firebase/config";
const isImageValid = async (imageLink) => {
    try {
        await fetch(`${imageLink}`);
        return true;
    }
    catch {
        return false
    }

}

export const fetchUser = createAsyncThunk('activeUser/fetchUser', async () => {
    return new Promise((resolve, reject) => {
        const unSubscribe = onAuthStateChanged(auth, async (userCred) => {
            if (userCred?.emailVerified) {
                const imageValidity = await isImageValid(userCred.photoURL);
                let userImageURL = '';
                if (imageValidity) {
                    userImageURL = userCred.photoURL;
                }
                else {
                    userImageURL = 'https://i0.wp.com/digitalhealthskills.com/wp-content/uploads/2022/11/3da39-no-user-image-icon-27.png?fit=500%2C500&ssl=1'
                }

                const userData = {
                    userName: userCred.displayName,
                    userEmail: userCred.email,
                    isEmailVerified: userCred.emailVerified,
                    userImage: userImageURL,
                    uid: userCred.uid
                }
                resolve(userData)
            }
            else {
                reject({});
            }


        })

        return () => {
            unSubscribe();
        }
    }
    )
})

export const logOutUser = createAsyncThunk('activeUser/logOutUser',async ()=>{
    try{
        await signOut(auth);
        return true;
    }
    catch(error){
         console.log(error);
    }
})
const initialState = {
    user: {
        userName: '',
        userEmail: '',
        isEmailVerified: false,
        userImage: '',
        uid: '',
    },
    loading:true,
}
export const authSlice = createSlice({
    name: 'activeUser',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchUser.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
        })
        builder.addCase(fetchUser.rejected,(state)=>{
            state.loading=false;
        })
        builder.addCase (logOutUser.pending,(state)=>{
            state.loading=true;
        })
        builder.addCase(logOutUser.fulfilled,(state)=>{
            state.loading=false;
            state.user=initialState.user;
        })
        builder.addCase(logOutUser.rejected,(state)=>{
            state.loading=false;
        })
    }

})

// export const { setActiveUser } = authSlice.actions;
export default authSlice.reducer;


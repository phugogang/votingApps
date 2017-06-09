import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AppService {
    private HOST_BACKEND = '/api';

    constructor(private _http: Http) { };

    get username() {
        return localStorage.getItem("username")
    }

    get userId() {
        return localStorage.getItem("_id")
    }

    get tokenHeader() {
        var header = new Headers({
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
            'Content-Type': 'application/json'
        });
        return new RequestOptions({ headers: header });
    }

    isAuthenticated() {
        return !!localStorage.getItem("token")
    }

    authRegister(user: any) {
        return this._http.post(`${this.HOST_BACKEND}/auth/register`, user, this.tokenHeader)
            .map((res: Response) => {
                return res.json()
            })
    }

    authLogin(user: any) {
        return this._http.post(`${this.HOST_BACKEND}/auth/login`, user, this.tokenHeader)
            .map((res: Response) => {
                return res.json()
            })
    }

    getListVote() {
        return this._http.get(`${this.HOST_BACKEND}/votes`)
            .map((response: Response) => {
                return response.json();
            });
    }

    getDetailVote(id: string) {
        return this._http.get(`${this.HOST_BACKEND}/votes/${id}`)
            .map((res: Response) => res.json())
    }


    createVote(question: string, choices: string[]) {
        return this._http.post(`${this.HOST_BACKEND}/votes`, { question, choices }, this.tokenHeader)
            .map((res: Response) => res.json());
    }

    editVote(id: string, question: string) {
        return this._http.put(`${this.HOST_BACKEND}/votes/${id}`, { question }, this.tokenHeader)
            .subscribe(() => { return; });
    }

    deleteVote(id: string) {
        return this._http.delete(`${this.HOST_BACKEND}/votes/${id}`, this.tokenHeader);
    }

    postChoice(vote_id: string, choices: string) {
        return this._http.post(`${this.HOST_BACKEND}/choices`, { vote_id, choices }, this.tokenHeader)
            .map((res: Response) => res.json())
    }


    editChoice(id: string, choices: string) {
        return this._http.put(`${this.HOST_BACKEND}/choices/${id}`, { choices }, this.tokenHeader)
            .subscribe(() => {
                return;
            })
    }

    postChoiceRating(choice_id: string) {
        return this._http.post(`${this.HOST_BACKEND}/choices/${choice_id}/rating`, {}, this.tokenHeader)
            .map((res: Response) => res.json())
    }


    postComment(vote_id: string, text: string) {
        console.log(`${this.HOST_BACKEND}/votes/${vote_id}/comments`);
        return this._http.post(`${this.HOST_BACKEND}/votes/${vote_id}/comments`, { text: text }, this.tokenHeader)
            .map((res: Response) => res.json())
    }

    deleteComment(vote_id: string, comment_id: string) {
        return this._http.delete(`${this.HOST_BACKEND}/votes/${vote_id}/comments/${comment_id}`, this.tokenHeader)
            .map((res: Response) => res.json())
    }


    getClientIP() {
        return this._http.get(`${this.HOST_BACKEND}/clientIP`)
            .map((res: Response) => res.json())
    }


    getMyVote(user_id: string) {
        return this._http.get(`${this.HOST_BACKEND}/myvote/${user_id}`, this.tokenHeader)
            .map((res: Response) => res.json());
    }



}

import { API_ENDPOINTS } from '../config/api';
import apiService from './api.service';
import type { SubmitCodeRequest, SubmitCodeResponse } from '../types/api';

class CodesService {
    async submitCode(data: SubmitCodeRequest): Promise<SubmitCodeResponse> {
        try {
            const response = await apiService.post<SubmitCodeResponse>(
                API_ENDPOINTS.SUBMIT_CODE,
                data,
                true // Requiere autenticación
            );

            // La respuesta ya tiene el formato correcto: { status: 201, message, data }
            return response as unknown as SubmitCodeResponse;
        } catch (error: any) {
            // Manejar errores de validación (422)
            if (error.status === 422 && error.errors) {
                throw error;
            }
            // Manejar código ya utilizado (400)
            if (error.status === 400) {
                throw error;
            }
            // Manejar código no encontrado (404)
            if (error.status === 404) {
                throw error;
            }
            console.error('Error submitting code:', error);
            throw error;
        }
    }
}

export const codesService = new CodesService();
export default codesService;

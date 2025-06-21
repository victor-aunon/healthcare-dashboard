import Swal, { SweetAlertResult, SweetAlertOptions } from 'sweetalert2'
import type { AlertService } from 'application/ports'

export type AlertProps = SweetAlertOptions & {
  alignLeft?: boolean
}

export function alertService(): AlertService<
  AlertProps,
  SweetAlertResult<any>
> {
  const commonProps: AlertProps = {
    allowEscapeKey: true,
    allowOutsideClick: true,
    confirmButtonText: 'Okay',
    confirmButtonColor: 'hsla(134, 76%, 41%, 0.8)',
    cancelButtonColor: '#7c7c7c',
  }

  const errorAlert = ({ alignLeft = false, ...props }: AlertProps) => {
    return Swal.fire({
      ...commonProps,
      icon: 'error',
      showCancelButton: !!props.cancelButtonText,
      reverseButtons: !!props.cancelButtonText,
      customClass: { htmlContainer: alignLeft ? 'align-left' : '' },
      ...props,
    } as AlertProps)
  }

  const infoAlert = ({ alignLeft = false, ...props }: AlertProps) => {
    return Swal.fire({
      ...commonProps,
      icon: 'info',
      showCancelButton: !!props.cancelButtonText,
      reverseButtons: !!props.cancelButtonText,
      customClass: { htmlContainer: alignLeft ? 'align-left' : '' },
      ...props,
    } as AlertProps)
  }

  const questionAlert = ({ alignLeft = false, ...props }: AlertProps) => {
    return Swal.fire({
      ...commonProps,
      icon: 'question',
      allowEscapeKey: false,
      allowOutsideClick: false,
      showCancelButton: !!props.cancelButtonText,
      reverseButtons: !!props.cancelButtonText,
      customClass: { htmlContainer: alignLeft ? 'align-left' : '' },
      ...props,
    } as AlertProps)
  }

  const successAlert = ({ alignLeft = false, ...props }: AlertProps) => {
    return Swal.fire({
      ...commonProps,
      icon: 'success',
      showCancelButton: !!props.cancelButtonText,
      reverseButtons: !!props.cancelButtonText,
      customClass: { htmlContainer: alignLeft ? 'align-left' : '' },
      ...props,
    } as AlertProps)
  }

  const warningAlert = ({ alignLeft = false, ...props }: AlertProps) => {
    return Swal.fire({
      ...commonProps,
      icon: 'warning',
      showCancelButton: !!props.cancelButtonText,
      reverseButtons: !!props.cancelButtonText,
      customClass: { htmlContainer: alignLeft ? 'align-left' : '' },
      ...props,
    } as AlertProps)
  }

  return { errorAlert, infoAlert, questionAlert, successAlert, warningAlert }
}

import { printToFileAsync } from 'expo-print'
import { shareAsync } from 'expo-sharing'
import colors from './appcolors'


export const printReceipt = async(cart) => {
    let html = `
        <html>
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
            </head>
            <body>
                <div style="color: ${colors.white}; background-color: ${colors.appbg}; padding: 10">
                    <div style="text-align: center; font-size: 50px; font-weight: bold">
                        POS Checkout Receipt
                    </div>
                    <p style="text-align: center; font-size: 25px">POS Order Items</p>
                </div>
                <div>
                    <table width="100%" cellspacing="0" cellpadding="0">
                        <thead>
                            <tr>
                                <th>No#</th>
                                <th>Product Name</th>
                                <th>Price</th>
                                <th>Qty</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
    `

    let total_price = 0
    cart.forEach((item, index)=>{
        total_price += (item?.price * item?.qty)
        html +=`
            <tr style="text-align: center">
                <td>${index + 1}</td>
                <td>${item?.name ?? ''}</td>
                <td>${item?.price ?? ''}</td>
                <td>${item?.qty ?? ''}</td>
                <td>${(item?.price * item.qty).toFixed(2)}</td>
            </tr>
        `
    })
    html += `
            <tr>
                <td style="text-align: center">Total</td>
                <td colspan="3"></td>
                <td style="text-align: center">${total_price.toFixed(2)}</td>
            </tr>
        `        
    html += `
                        </tbody>
                    </table>
                </div>
            </body>
        </html>
    `

    const {uri} = await printToFileAsync({html})
    await shareAsync(uri)
}

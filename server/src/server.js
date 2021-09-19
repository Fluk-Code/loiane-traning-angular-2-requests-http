import express from 'express'
import multiparty from 'connect-multiparty'
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const corsOptions = {
  origin: '*',
  optionsSucessStatus: 200,
  AccessControlAllowOrigin: 'POST'
}
app.use(cors(corsOptions))


const multipartyMiddleware = multiparty({ uploadDir: './uploads' })
app.post('/upload', multipartyMiddleware, (req, res) => {
  const files = req.files

  console.log(files)

  res.status(200).json({ message: files })
})

app.get('/downloadPdf', (req, res) => {
  res.download('./uploads/report.pdf')
})

app.get('/downloadExcel', (req, res) => {
  res.download('./uploads/report.xlsx')  
})

app.use((err, req, res, next) => res.json({ error: err.message }))


app.listen(3000, () => console.log('SERVIDOR ONLINE NA PORTA 3000'))
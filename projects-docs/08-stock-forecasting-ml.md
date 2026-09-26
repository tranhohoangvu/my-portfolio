# 📈 Introduction to Machine Learning – Final Project (Optimizers, Stock Forecasting & MNIST CNN)

> **Thời gian thực hiện:** Tháng 9, 2024 – Tháng 12, 2024  
> **Khóa học / Lĩnh vực:** Đồ án môn Nhập môn Học máy (Machine Learning)  
> **Nhóm thực hiện:** Trần Hồ Hoàng Vũ (52200214) & Cộng sự  
> **GitHub Repository:** [https://github.com/tranhohoangvu/Machine-Learning](https://github.com/tranhohoangvu/Machine-Learning)

---

## 1. Tổng quan & Nghiệp vụ cốt lõi
- **Mục tiêu:** Thực hiện nghiên cứu và giải quyết 3 bài toán nền tảng của Machine Learning hiện đại: (1) Khảo sát thực nghiệm toán học về tốc độ hội tụ của các thuật toán tối ưu hóa Gradient Descent; (2) Dự báo chuỗi thời gian giá mở cửa cổ phiếu (Stock Open Price) kết hợp dữ liệu kinh tế vĩ mô; (3) Phân loại ảnh chữ số viết tay chuẩn MNIST bằng mạng tích chập CNN.
- **Nghiệp vụ cốt lõi:**
  - **Câu 1 – So sánh thuật toán tối ưu (Optimization Methods):** Cài đặt và đo lường tốc độ giảm loss trên bài toán hồi quy (Boston Housing) với 7 phương pháp: Batch Gradient Descent, Stochastic Gradient Descent (SGD), Mini-batch GD, Momentum, Adagrad, RMSProp và Adam.
  - **Câu 2 – Dự báo giá mở cửa chứng khoán (Stock Open Price Forecasting):** Sử dụng kỹ thuật cửa sổ trượt (Sliding Window) với độ dài chuỗi 60 ngày để dự báo giá mở cửa ngày tiếp theo cho từng mã cổ phiếu, so sánh hiệu quả giữa các kiến trúc học sâu (LSTM, FFNN) và mô hình cơ sở (Decision Tree, Hồi quy tuyến tính).
  - **Câu 3 – Phân loại chữ số viết tay MNIST:** Xây dựng mạng CNN phân loại 10 chữ số (0–9), theo dõi độ chính xác và ma trận nhầm lẫn.

---

## 2. Kiến trúc Hệ thống (System Architecture)
- **Mô hình kiến trúc:** Pipeline Machine Learning & Deep Learning hoàn chỉnh trên TensorFlow/Keras và scikit-learn.
- **Mô hình triển khai:**
  - **Mô hình tối ưu hóa:** Thuật toán tối ưu Gradient Descent tự lập trình, theo dõi giá trị hàm mất mát (Loss per epoch) và vẽ đường cong hội tụ.
  - **Mô hình chuỗi thời gian:** Mạng nơ-ron truyền thẳng FFNN (Dense 50 -> Dense 50 -> Dense 1) và mạng LSTM xếp tầng (Stacked LSTM) xử lý dữ liệu tuần tự thời gian.
  - **Mô hình thị giác máy tính:** Mạng CNN tuần tự gồm `Conv2D(32, 3x3, ReLU)` -> `MaxPool(2x2)` -> `Conv2D(64, 3x3, ReLU)` -> `MaxPool(2x2)` -> `Flatten` -> `Dense(128, ReLU)` -> `Dropout(0.5)` -> `Dense(10, Softmax)`.

---

## 3. Cơ sở dữ liệu & Xử lý dữ liệu (Database & Storage)
- **Tập dữ liệu sử dụng:**
  1. `HousingData.csv` (506 dòng x 14 cột): Bài toán hồi quy giá nhà Boston phục vụ kiểm thử thuật toán tối ưu.
  2. `data_src_2.csv` (6,816 dòng x 10 cột): Chuỗi thời gian tài chính gồm các trường `Date, Adj Close, Close, High, Low, Open, Volume, Industry, Ticker, GDP`.
  3. `MNIST Dataset`: 70,000 ảnh chữ số viết tay kích thước $28 \times 28$.
- **Quy trình xử lý dữ liệu:**
  - Lọc dữ liệu theo từng mã chứng khoán (Ticker), sắp xếp tuần tự theo ngày tháng.
  - Chuẩn hóa thang đo giá mở cửa bằng **MinMaxScaler** về khoảng $[0, 1]$.
  - Sinh tập mẫu huấn luyện bằng kỹ thuật trượt cửa sổ thời gian: đầu vào $X$ gồm 60 giá trị Open liên tiếp, nhãn $y$ là giá trị Open của ngày thứ 61.

---

## 4. Thách thức Kỹ thuật & Giải pháp Thực tế (Key Challenges & Solutions)
- **Bài toán 1: Lập trình và trực quan hóa so sánh 7 thuật toán tối ưu Gradient**  
  *Thách thức:* Làm rõ cơ chế vượt qua điểm yên ngựa (saddle points) và hiện tượng dao động mạnh của SGD so với các phương pháp có quán tính và learning rate thích ứng.  
  *Giải pháp:* Lập trình các phương pháp tối ưu, lưu vết giá trị loss qua từng epoch và vẽ biểu đồ so sánh trực quan; chứng minh Adam và RMSProp hội tụ nhanh và ổn định nhất.
- **Bài toán 2: Chuẩn bị chuỗi dữ liệu cửa sổ trượt (Sequence Length = 60) chống Data Leakage**  
  *Thách thức:* Đảm bảo không để dữ liệu tương lai rò rỉ vào quá khứ trong quá trình chuẩn hóa và trượt cửa sổ.  
  *Giải pháp:* Phân chia train/test theo thứ tự thời gian nghiêm ngặt trước khi fit bộ scaler; tạo cấu trúc tensor 3 chiều `(samples, 60, features)` phù hợp cho mạng LSTM.
- **Bài toán 3: Kiểm soát Overfitting trên mạng nơ-ron dự báo chuỗi thời gian**  
  *Thách thức:* Mạng nơ-ron học sâu rất dễ ghi nhớ nhiễu của thị trường chứng khoán khiến sai số dự báo trên tập test tăng cao.  
  *Giải pháp:* Tích hợp kỹ thuật điều quy hóa **Dropout (0.2–0.5)**, hệ số phạt **L2 Regularization** và cơ chế dừng sớm **EarlyStopping** theo dõi `val_loss`; đánh giá khách quan qua hai chỉ số định lượng **MSE** và **$R^2$ score**.

---

## 5. Công nghệ & Thư viện sử dụng
- **Ngôn ngữ & Môi trường:** Python 3.10+, Jupyter Lab / Jupyter Notebook.
- **Framework AI/ML:** TensorFlow, Keras, scikit-learn.
- **Xử lý số liệu & Đồ thị:** NumPy, pandas, Matplotlib, Seaborn.